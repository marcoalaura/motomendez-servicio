/**
 * Módulo para certificado
 * 
 * @module
 * 
 * @param {type} sequelize
 * @param {type} DataType
 * @returns {solicitud}
 */
module.exports = (sequelize, DataType) => {
  const certificado = sequelize.define('certificados', {
    id_certificado: {type: DataType.STRING(255), primaryKey: true},
    id_registro: {type: DataType.STRING(255), allowNull: true},
    fecha_cer: {type: DataType.DATE, allowNull: true},
    def_otras: {type: DataType.STRING(250), allowNull: true},
    dis_otras: {type: DataType.STRING(250), allowNull: true},
    ayuda_permanente: {type: DataType.INTEGER, allowNull: true},
    causa_def: {type: DataType.STRING(250), allowNull: true},
    edad_ano: {type: DataType.INTEGER, allowNull: true},
    edad_mes: {type: DataType.INTEGER, allowNull: true},
    diagnostico: {type: DataType.STRING(250), allowNull: true},
    man_clinicas: {type: DataType.STRING(250), allowNull: true},
    grados_disc: {type: DataType.INTEGER, allowNull: true},
    tipo_disc: {type: DataType.INTEGER, allowNull: false},
    deficiencia: {type: DataType.INTEGER, allowNull: true},
    autonomia: {type: DataType.INTEGER, allowNull: true},
    porcentaje: {type: DataType.INTEGER, allowNull: true},
    literal: {type: DataType.STRING(50), allowNull: true},
    ninguna: {type: DataType.INTEGER, allowNull: true},
    revalorizacion: {type: DataType.DATE, allowNull: true},
    rehabilitacion: {type: DataType.STRING(250), allowNull: true},
    terapia_fisica: {type: DataType.STRING(250), allowNull: true},
    recomendacion: {type: DataType.STRING(250), allowNull: true},
    caracteristicas: {type: DataType.STRING(250), allowNull: true},
    flag: {type: DataType.INTEGER, allowNull: true}
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    classMethods: {}
  });
  
  certificado.associate = (models) => {
    certificado.belongsTo(models.registro, {as: 'tregistro', foreignKey: {name: 'id_registro', targetKey: 'id_registro'}});
  };

  return certificado;
};
