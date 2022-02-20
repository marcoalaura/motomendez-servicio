var moment = require('moment');
var express = require('express');
var router = express.Router();

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Get certificado
 * @api {get} /api/v2/pcd/:ci Obtener certificado de discapacidad por ci
 * @apiParam (Parámetro) {string} ci Documento de Identidad de la persona con discapacidad
 * @apiDescription Get para obtención de certificación de discapacidad
 *
 * @apiSuccess {Integer} codigo Código de respuesta (1 = Datos encontrados, 0 = Datos no encontrados).
 * @apiSuccess {String} mensaje Mensaje de la respuesta.
 * @apiSuccess {Object} datos Datos de la respuesta.
 * @apiSuccess {String} datos.depto_registro Departamento donde se registró la persona con discapacidad.
 * @apiSuccess {String} datos.ci  Cédula de identidad de la persona.
 * @apiSuccess {String} datos.ap_paterno Apellido paterno de la persona.
 * @apiSuccess {String} datos.ap_materno Apellido materno de la persona.
 * @apiSuccess {String} datos.nombres Nombre(s) de la persona.
 * @apiSuccess {String} datos.fecha_nac Fecha de nacimiento de la persona.
 * @apiSuccess {String} datos.sexo Sexo de la persona FEMENINO/MASCULINO.
 * @apiSuccess {String} datos.celular Celular de la persona.
 * @apiSuccess {String} datos.direccion Dirección de la persona.
 * @apiSuccess {String} datos.valsegip Indica si el registro tiene observación.
 * @apiSuccess {String} datos.obsvalsegip Observación del registro.
 * @apiSuccess {Object[]} datos.tcertificado Lista de los certificados de discapacidad que ha tenido y tiene la persona.
 * @apiSuccess {String} datos.tcertificado.fecha_cer Fecha de emisión del certificado.
 * @apiSuccess {String} datos.tcertificado.tipo_disc Tipo de discapacidad.
 * @apiSuccess {String} datos.tcertificado.grados_disc Grado de discapacidad.
 * @apiSuccess {Integer} datos.tcertificado.porcentaje Porcentaje de discapacidad obtenido en su calificación.
 * @apiSuccess {String} datos.tcertificado.observacion Observaciones de la calificación (si accede o no al carnet de discapacidad).
 * @apiSuccess {String} datos.tcertificado.observacion2 Observaciones del carnet de discapacidad (si cuenta o no con el carnet de discapacidad).
 * @apiSuccess {String} datos.tcertificado.fecha_vig Fecha de vigencia del certificado.
 *
 * @apiSuccessExample {json} Respuesta del Ejemplo:
 * HTTP/1.1 200 OK
 {
   "codigo": 1,
   "mensaje": "Se encontró un registro pcd.",
   "datos": {
       "depto_registro": "LA PAZ",
       "ci": "2238260",
       "ap_paterno": "CALLISAYA",
       "ap_materno": "FLORES",
       "nombres": "MANUEL",
       "fecha_nac": "26/12/1957",
       "sexo": "FEMENINO",
       "celular": "",
       "direccion": "Z. 16 DE JULIO C. PASCOE N°2986",
       "valsegip": null,
       "obsvalsegip": null,
       "tcertificado": [
           {
               "fecha_cer": "07/04/2013",
               "tipo_disc": "FISICA MOTORA",
               "grados_disc": "GRAVE",
               "porcentaje": 55,
               "observacion": "ACCEDE AL CARNET DE DISCAPACIDAD",
               "observacion2": "CUENTA CON EL CARNET DE DISCAPACIDAD",
               "fecha_vig": "07/04/2017"
           }
       ]
   }
 }
 */
router.get('/:ci', function(req, res, next) {
  var ci = req.params.ci;
  const sequelize = req.app.db.sequelize;
  req.app.db.models.registro.findAll({
    attributes: [
      [sequelize.literal(`CASE id_dept
        WHEN '1' THEN 'CHUQUISACA'
        WHEN '2' THEN 'LA PAZ'
        WHEN '3' THEN 'COCHABAMBA'
        WHEN '4' THEN 'ORURO'
        WHEN '5' THEN 'POTOSI'
        WHEN '6' THEN 'TARIJA'
        WHEN '7' THEN 'SANTA CRUZ'
        WHEN '8' THEN 'BENI'
        WHEN '9' THEN 'PANDO' END`), 'depto_registro'],
      'ci',
      'ap_paterno',
      'ap_materno',
      'nombres',
      'fecha_nac',
      [sequelize.literal(`CASE sexo
        WHEN '0' THEN 'MASCULINO'
        WHEN '1' THEN 'FEMENINO' END`), 'sexo'],
      'celular',
      'direccion',
      'valsegip',
      'obsvalsegip'
    ],
    include: [
      {
        attributes: [
          'fecha_cer',
          [sequelize.literal(`CASE tipo_disc
            WHEN '1' THEN 'FISICA MOTORA'
            WHEN '2' THEN 'INTELECTUAL'
            WHEN '3' THEN 'SENSORIAL'
            WHEN '4' THEN 'MULTIPLE'
            WHEN '5' THEN 'VISUAL'
            WHEN '6' THEN 'AUDITIVO'
            WHEN '7' THEN 'MENTAL O PSIQUICA' END`), 'tipo_disc'],
          [sequelize.literal(`CASE grados_disc
            WHEN '1' THEN 'LEVE'
            WHEN '2' THEN 'MODERADO'
            WHEN '3' THEN 'GRAVE'
            WHEN '4' THEN 'MUY GRAVE' END`), 'grados_disc'],
          'porcentaje',
          [sequelize.literal(`CASE
            WHEN porcentaje < 30 THEN 'NO ACCEDE AL CARNET DE DISCAPACIDAD'
            WHEN porcentaje >= 30 THEN 'ACCEDE AL CARNET DE DISCAPACIDAD' END`), 'observacion'],
          [sequelize.literal(`CASE tcertificado.flag
            WHEN '0' THEN 'NO CUENTA CON EL CARNET DE DISCAPACIDAD'
            WHEN '1' THEN 'CUENTA CON EL CARNET DE DISCAPACIDAD' END`), 'observacion2'],
          ['fecha_cer', 'fecha_vig']
        ],
        model: req.app.db.models.certificado,
        as: 'tcertificado',
        required: false
      }
    ],
    where: { ci: ci }
  })
  .then(result => {
    if (result.length === 1) {
      result[0].dataValues.tcertificado[0].dataValues.fecha_vig.setFullYear(result[0].dataValues.tcertificado[0].dataValues.fecha_vig.getFullYear() + 4);
      result[0].dataValues.fecha_nac = moment(result[0].dataValues.fecha_nac).format('DD/MM/YYYY');
      result[0].dataValues.tcertificado[0].dataValues.fecha_cer = moment(result[0].dataValues.tcertificado[0].dataValues.fecha_cer).format('DD/MM/YYYY');
      result[0].dataValues.tcertificado[0].dataValues.fecha_vig = moment(result[0].dataValues.tcertificado[0].dataValues.fecha_vig).format('DD/MM/YYYY');
      res.json({
        codigo: 1,
        mensaje: 'Se encontró un registro pcd.',
        datos: result[0]
      });
    } else {
      res.json({
        codigo: 0,
        mensaje: 'No se encontró información con el ci indicado.',
        datos: null
      });
    }
  }).catch(error => {
    let msg = '(SIPRUNPCD) Error inesperado.';
    if (error.name === 'SequelizeConnectionError' ||
            error.name === 'SequelizeHostNotReachableError' ||
            error.name === 'SequelizeConnectionRefusedError') {
      msg = 'No se pudo conectar a la base de datos de SIPRUNPCD.';
    }
    res.json({
      codigo: 0,
      mensaje: msg,
      datos: null
    });
  });
});

module.exports = router;
