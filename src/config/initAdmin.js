const { Admin } = require('../models');

async function initAdmin() {
  const adminExists = await Admin.findOne({ where: { user: 'admin' } });
  if (adminExists) {
    console.log('Usuario admin ya fue inicializado');
    return adminExists;
  }
  // Crear el usuario admin si no existe
  const newAdmin = await Admin.create({ user: 'admin', pass: 'admin' });
  console.log('El usuario admin fue creado exitosamente');
  return newAdmin;
}

module.exports = { initAdmin };
