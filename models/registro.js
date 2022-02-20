/**
 * Módulo para solicitud
 * 
 * @module
 * 
 * @param {type} sequelize
 * @param {type} DataType
 * @returns {solicitud}
 */
module.exports = (sequelize, DataType) => {
  const registro = sequelize.define('registro', {
    id_registro: {type: DataType.STRING(255), primaryKey: true},
    id_anterior: {type: DataType.STRING(255), allowNull: true},
    id_dept: {type: DataType.INTEGER, allowNull: true},
    fecha_reg: {type: DataType.DATE, allowNull: true},
    fecha_upd: {type: DataType.DATE, allowNull: true},
    id_usuario: {type: DataType.INTEGER, allowNull: true},
    resp_registro: {type: DataType.STRING(100), allowNull: true},
    resp_carnet: {type: DataType.STRING(100), allowNull: true},
    res_unidad: {type: DataType.STRING(100), allowNull: true},
    id_institucion: {type: DataType.INTEGER, allowNull: true},
    ap_paterno: {type: DataType.STRING(100), allowNull: true},
    ap_materno: {type: DataType.STRING(100), allowNull: true},
    nombres: {type: DataType.STRING(100), allowNull: true},
    ci: {type: DataType.STRING(255), allowNull: true},
    expedido: {type: DataType.STRING(25), allowNull: true},
    sangre: {type: DataType.STRING(10), allowNull: true},
    fecha_nac: {type: DataType.DATE, allowNull: true},
    edad: {type: DataType.INTEGER, allowNull: true},
    lugar_nac: {type: DataType.STRING(100), allowNull: true},
    sexo: {type: DataType.INTEGER, allowNull: true},
    direccion: {type: DataType.STRING(250), allowNull: true},
    id_depto: {type: DataType.INTEGER, allowNull: true},
    id_provincia: {type: DataType.INTEGER, allowNull: true},
    id_municipio: {type: DataType.INTEGER, allowNull: true},
    canton: {type: DataType.STRING(40), allowNull: true},
    comunidad: {type: DataType.STRING(40), allowNull: true},
    telefono: {type: DataType.STRING(10), allowNull: true},
    celular: {type: DataType.STRING(30), allowNull: true},
    estado_civil: {type: DataType.INTEGER, allowNull: true},
    nro_hijos: {type: DataType.INTEGER, allowNull: true},
    vive_con: {type: DataType.INTEGER, allowNull: true},
    nombre_insitucion: {type: DataType.STRING(100), allowNull: true},
    vivienda: {type: DataType.INTEGER, allowNull: true},
    seguro: {type: DataType.INTEGER, allowNull: true},
    idiomas: {type: DataType.FLOAT, allowNull: true},
    o_idioma: {type: DataType.STRING(50), allowNull: true},
    lee: {type: DataType.INTEGER, allowNull: true},
    lee_b: {type: DataType.INTEGER, allowNull: true},
    esp_lee: {type: DataType.STRING(100), allowNull: true},
    escribir: {type: DataType.INTEGER, allowNull: true},
    esc_b: {type: DataType.INTEGER, allowNull: true},
    esp_escribir: {type: DataType.STRING(100), allowNull: true},
    ed_especial: {type: DataType.INTEGER, allowNull: true},
    cuantos: {type: DataType.INTEGER, allowNull: true},
    institucion_edu: {type: DataType.STRING(100), allowNull: true},
    ed_especial_actual: {type: DataType.INTEGER, allowNull: true},
    cuantos_actual: {type: DataType.INTEGER, allowNull: true},
    institucion_esp_actual: {type: DataType.STRING(100), allowNull: true},
    oficio: {type: DataType.STRING(200), allowNull: true},
    ejerce: {type: DataType.INTEGER, allowNull: true},
    oficio_actual: {type: DataType.INTEGER, allowNull: true},
    otros_ocupacion: {type: DataType.STRING(200), allowNull: true},
    oficio_anterior: {type: DataType.INTEGER, allowNull: true},
    otros_anterior: {type: DataType.STRING(200), allowNull: true},
    reha: {type: DataType.INTEGER, allowNull: true},
    esp_reha: {type: DataType.STRING(50), allowNull: true},
    institucion_reha: {type: DataType.STRING(100), allowNull: true},
    reha_actual: {type: DataType.INTEGER, allowNull: true},
    esp_reha_actual: {type: DataType.STRING(50), allowNull: true},
    institucion_reha_actual: {type: DataType.STRING(100), allowNull: true},
    flag: {type: DataType.INTEGER, allowNull: true},
    impresiones: {type: DataType.INTEGER, allowNull: true},
    certificado: {type: DataType.INTEGER, allowNull: true},
    causas_disca: {type: DataType.STRING(255), allowNull: true},
    completado: {type: DataType.INTEGER, allowNull: true},
    nro_formulario: {type: DataType.STRING(50), allowNull: true},
    exp_departamento: {type: DataType.INTEGER, allowNull: true},
    nro_documento: {type: DataType.STRING(50), allowNull: true},
    complemento: {type: DataType.STRING(50), allowNull: true},
    primer_apellido: {type: DataType.STRING(50), allowNull: true},
    segundo_apellido: {type: DataType.STRING(50), allowNull: true},
    apellido_casada: {type: DataType.STRING(60), allowNull: true},
    nombre_completo: {type: DataType.STRING(60), allowNull: true},
    fecha_nacimiento: {type: DataType.DATE, allowNull: true},
    estadocivil: {type: DataType.STRING(1), allowNull: true},
    formato_inf: {type: DataType.STRING(5), allowNull: true},
    valsegip: {type: DataType.INTEGER, allowNull: true},
    obsvalsegip: {type: DataType.STRING(500), allowNull: true},
    primer_envio: {type: DataType.INTEGER, allowNull: true}
  }, {
    freezeTableName: true, 
    createdAt: false,
    updatedAt: false,
    classMethods: {}
  });
  
  registro.associate = function(models) {
    registro.hasMany(models.certificado, {as: 'tcertificado', foreignKey: {name: 'id_registro', allowNull: false}});
    registro.hasMany(models.acudiente, {as: 'tacudiente', foreignKey: {name: 'id_registro', allowNull: false}});
  };

  return registro;
};
