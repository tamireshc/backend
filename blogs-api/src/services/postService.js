const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const published = new Date();
const updated = new Date();

const { BlogPost, User, Category, PostCategory } = require('../models');

const getAllPostWithCategoriesAndUser = async () => {
  const result = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return { type: null, message: result };
};

const getPostByIdWithCategoriesAndUser = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }
  return { type: null, message: post };
};

const deletePost = async (id, email) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }
  if (email !== post.user.email) {
    return { type: 'USER_ERROR', message: 'Unauthorized user' };
  }
  const result = await BlogPost.destroy({
    where: { id },
  });
  return { type: null, message: result };
};

const getPostByTerm = async (term) => {
  const posts = await BlogPost.findAll({ where: {
      [Op.or]: [
        {
          title: {
            [Op.substring]: term,
          },
        },
        {
          content: {
            [Op.substring]: term,
          },
        },
      ],
    },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { type: null, message: posts };
};

const checkIfCategoriesExists = async (categoryIds) => {
  const categories = await Category.findAll({
    where: {
      [Op.or]: categoryIds.map((item) => ({ id: item })),
    },
  });
  return categories;
};

const getUserId = async (email) => {
  const userId = await User.findOne({
    where: { email },
  });
  return userId;
};

const insertPost = async (title, content, categoryIds, email) => {
 const categories = await checkIfCategoriesExists(categoryIds);
 if (categories[0] === undefined) {
  return { type: 'NOT_FOUND', message: '"categoryIds" not found' };
 }
 const user = await getUserId(email);
 const userId = user.id;
 const t = await sequelize.transaction();

 try {
  const post = await BlogPost.create({ title, content, userId, published, updated },
     { transaction: t });
 await PostCategory.bulkCreate(categories.map((item) => 
 ({ postId: post.id, categoryId: item.id })), { transaction: t });

  await t.commit();
  return { type: null, message: post };
} catch (e) {
  await t.rollback();
  throw e; 
}
};

const updatePost = async (title, content, email, id) => {
  const user = await getUserId(email);
  const post = await BlogPost.findOne({
    where: { id },
  });
  if (user.id !== post.userId) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
  }
   await BlogPost.update({ title, content, updated }, { where: { id } });
   const postEdit = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
   });
  return { type: null, message: postEdit };
};

module.exports = {
  getAllPostWithCategoriesAndUser,
  getPostByIdWithCategoriesAndUser,
  deletePost,
  getPostByTerm,
  insertPost,
  updatePost,
};