const ActorENT = require('../ENT/ActorENT');
const ActorDTO = require('../DTO/ActorDTO');
const ResponseDTO = require('../DTO/ResponseDTO');

const getAllActors = async () => {
  console.log('Obteniendo todos los actores...');
  try {
    const actors = await ActorENT.findAll();
    const actorDTOs = actors.map((actor) => new ActorDTO(actor));
    console.log('Actores obtenidos correctamente.');
    return new ResponseDTO('ACT-0000', actorDTOs, 'Actores obtenidos correctamente');
  } catch (error) {
    console.error('Error al obtener todos los actores:', error);
    return new ResponseDTO('ACT-1001', null, 'Error al obtener todos los actores: '+ error);
  }
};

const getActorsWithPagination = async (offset, perPage) => {
  console.log(`Obteniendo actores con paginación: offset ${offset}, perPage ${perPage}`);
  try {
    const actors = await ActorENT.findAll({ offset, limit: perPage });
    const actorDTOs = actors.map((actor) => new ActorDTO(actor));

    console.log('Actores obtenidos con paginación correctamente.');
    return new ResponseDTO('ACT-0000', actorDTOs, 'Actores obtenidos con paginación correctamente');
  } catch (error) {
    console.error('Error al obtener actores con paginación:', error);
    return new ResponseDTO('ACT-1001', null, 'Error al obtener actores con paginación: ' + error);
  }
};

const getActorById = async (id) => {
  console.log(`Obteniendo el actor con ID: ${id}...`);
  try {
    const actor = await ActorENT.findByPk(id);
    if (!actor) {
      console.log(`Actor con ID: ${id} no encontrado.`);
      return new ResponseDTO('ACT-1002', null, 'Actor no encontrado');
    }
    console.log('Actor obtenido correctamente.');
    return new ResponseDTO('ACT-0000', new ActorDTO(actor), 'Actor obtenido correctamente');
  } catch (error) {
    console.error(`Error al obtener el actor con ID: ${id}.`, error);
    return new ResponseDTO('ACT-1002', null, 'Error al obtener el actor '+ error);
  }
};

const createActor = async (actorData) => {
  console.log('Creando un nuevo actor...');
  try {
    const nuevoActor = await ActorENT.create(actorData);
    console.log('Actor creado correctamente.');
    return new ResponseDTO('ACT-0000', new ActorDTO(nuevoActor), 'Actor creado correctamente');
  } catch (error) {
    console.error('Error al crear el actor:', error);
    return new ResponseDTO('ACT-1003', null, 'Error al crear el actor '+ error);
  }
};

const updateActor = async (id, actorData) => {
  console.log(`Actualizando el actor con ID: ${id}...`);
  try {
    const actor = await ActorENT.findByPk(id);
    if (!actor) {
      console.log(`Actor con ID: ${id} no encontrado.`);
      return new ResponseDTO('ACT-1004', null, 'Actor no encontrado');
    }

    await actor.update(actorData);

    console.log('Actor actualizado correctamente.');
    return new ResponseDTO('ACT-0000', new ActorDTO(actor), 'Actor actualizado correctamente');
  } catch (error) {
    console.error(`Error al actualizar el actor con ID: ${id}.`, error);
    return new ResponseDTO('ACT-1004', null, 'Error al actualizar el actor '+ error);
  }
};

const deleteActor = async (id) => {
  console.log(`Eliminando el actor con ID: ${id}...`);
  try {
    const actor = await ActorENT.findByPk(id);
    if (!actor) {
      console.log(`Actor con ID: ${id} no encontrado.`);
      return new ResponseDTO('ACT-1005', null, 'Actor no encontrado');
    }

    await actor.destroy();

    console.log('Actor eliminado con éxito.');
    return new ResponseDTO('ACT-0000', 'Actor eliminado con éxito');
  } catch (error) {
    console.error(`Error al eliminar el actor con ID: ${id}.`, error);
    return new ResponseDTO('ACT-1005', null, 'Error al eliminar el actor '+ error);
  }
};

module.exports = {
  getAllActors,
  getActorById,
  getActorsWithPagination,
  createActor,
  updateActor,
  deleteActor,
};
