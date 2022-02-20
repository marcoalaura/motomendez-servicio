/**
 * Módulo para acudiente
 * 
 * @module
 * 
 * @param {type} sequelize
 * @param {type} DataType
 * @returns {solicitud}
 */
module.exports = (sequelize, DataType) => {
  const acudiente = sequelize.define('acudientes', {
    id_acudiente: {type: DataType.STRING(255), primaryKey: true},
    id_registro: {type: DataType.STRING(255), allowNull: true},
    nombres: {type: DataType.STRING(100), allowNull: true},
    paterno: {type: DataType.STRING(100), allowNull: true},
    materno: {type: DataType.STRING(100), allowNull: true},
    direccion: {type: DataType.STRING(250), allowNull: true},
    id_depto: {type: DataType.INTEGER, allowNull: true},
    id_provincia: {type: DataType.INTEGER, allowNull: true},
    id_municipio: {type: DataType.INTEGER, allowNull: true},
    canton: {type: DataType.STRING(40), allowNull: true},
    comunidad: {type: DataType.STRING(40), allowNull: true},
    telefono: {type: DataType.STRING(250), allowNull: true},
    celular: {type: DataType.STRING(250), allowNull: true},
    parentesco: {type: DataType.INTEGER, allowNull: true},
    otro_parentesco: {type: DataType.STRING(30), allowNull: true},
    ci: {type: DataType.STRING(50), allowNull: true},
    expedido: {type: DataType.STRING(50), allowNull: true},
    fecha_nac: {type: DataType.STRING(50), allowNull: true},
    sexo: {type: DataType.STRING(50), allowNull: true}
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    classMethods: {}
  });
  
  acudiente.associate = (models) => {
    acudiente.belongsTo(models.registro, {as: 'tregistro', foreignKey: {name: 'id_registro', targetKey: 'id_registro'}});
  };

  return acudiente;
};
