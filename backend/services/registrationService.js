const registrationModel = require("../models/registrationModel");

const createRegistration = async (body) => {

 const existingRegistration =
  await registrationModel.findOne({
    tournamentId: body.tournamentId,
    userId: body.userId,
  });
  if (existingRegistration) {
    throw new Error(
      "You have already registered for this tournament."
    );
  }

  const registration =
  await registrationModel.create({
    ...body,
    userId: body.userId,
  });
};


const getAllRegistrations = async () => {

  const registrations =
    await registrationModel
      .find()
      .populate(
        "tournamentId",
        "title date location fee"
      )
      .sort({
        createdAt: -1,
      });

  return registrations;
};


const getRegistrationById = async (id) => {

  const registration =
    await registrationModel
      .findById(id)
      .populate(
        "tournamentId",
        "title date location fee"
      );

  return registration;
};


const updateRegistration = async (id, body) => {

  const registration =
    await registrationModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

  return registration;
};


const deleteRegistration = async (id) => {

  const registration =
    await registrationModel.findByIdAndDelete(id);

  return registration;
};


module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};