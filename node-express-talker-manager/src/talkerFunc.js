const fs = require('fs').promises;
const { join } = require('path');

const path = 'talker.json';

const readFileTalker = async () => {
    try {
        const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
        return JSON.parse(contentFile);
    } catch (error) {
        console.log('erro na leitura');
        return null;
    }
};

const writeFileTalker = async (data) => {
    try {
        await fs.writeFile(join(__dirname, path), JSON.stringify(data));
    } catch (error) {
        console.log('erro na escrita');
        return null;
    }
};

const getAllTalkers = async () => {
    const result = await readFileTalker();
    console.log(result);
    return result;
};

const getTalkerById = async (id) => {
    try {
        const resultAllTalkers = await readFileTalker();
        const talkerById = resultAllTalkers.filter((item) => item.id === id);
        return talkerById[0];
    } catch (error) {
        console.log('erro na busca do usuário');
        return null;
    }
};

const insertNewTalker = async ({ name, age, talk }) => {
    try {
        const currentListTalkers = await readFileTalker();
        const inserid = currentListTalkers[currentListTalkers.length - 1].id;
        const newTalker = {
            name,
            age,
            id: inserid + 1,
            talk,
        };
        const newList = [...currentListTalkers, newTalker];
        await writeFileTalker(newList);
        return newList;
    } catch (error) {
        console.log('erro ao inserir o usuário');
        return null;
    }
};

const deleteTalker = async (id) => {
    try {
        const currentListTalkers = await readFileTalker();
        const newListWithoutTalker = currentListTalkers.filter((item) => item.id !== id);
        await writeFileTalker(newListWithoutTalker);
        return newListWithoutTalker;
    } catch (error) {
        console.log('erro ao  deletar o usuário');
        return null;
    }
};

const editTalker = async (id, data) => {
    try {
        const currentListTalkers = await readFileTalker();
        // console.log(currentListTalkers)
        const indexTalkerToEdit = currentListTalkers.findIndex((item) => item.id === +id);
        currentListTalkers[indexTalkerToEdit] = data;
        currentListTalkers[indexTalkerToEdit].id = id;
        await writeFileTalker(currentListTalkers);
        // console.log(currentListTalkers[indexTalkerToEdit])
        return currentListTalkers[indexTalkerToEdit];
    } catch (error) {
        console.log('erro ao editar o  usuário');
        return null;
    }
};

const querySearch = async (query) => {
    const currentListTalkers = await readFileTalker();
    console.log(query);
    try {
        const resultQuery = currentListTalkers.filter((item) => item.name.includes(query));
        return resultQuery;
    } catch (error) {
        console.log('erro ao buscar o usuário por nome');
        return null;
    }
};

module.exports = {
    getAllTalkers,
    getTalkerById,
    insertNewTalker,
    deleteTalker,
    querySearch,
    editTalker,
};