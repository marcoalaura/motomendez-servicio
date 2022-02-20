var express = require('express');
var router = express.Router();

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Get interoperabilidad dinamico
 * @api {get} /api/v2/dinamico/:ci Interoperabilidad dinámico
 * @apiParam (Parámetros) {string} ci Documento de Identidad de la persona con discapacidad
 * @apiDescription Get para obtención de certificación de discapacidad
 *
 * @apiSuccessExample {json} Respuesta del Ejemplo:
 * HTTP/1.1 200 OK
  {
    "id_registro": "19571226MCF",
    "id_anterior": null,
    "id_dept": 2,
    "fecha_reg": "2017-04-06T04:00:00.000Z",
    "fecha_upd": "2017-04-07T13:40:27.000Z",
    "id_usuario": 239,
    "resp_registro": "CODEPEDIS LP",
    "resp_carnet": "CODEPEDIS LP",
    "res_unidad": "SEDES LA PAZ",
    "id_institucion": 389,
    "ap_paterno": "CALLISAYA",
    "ap_materno": "FLORES",
    "nombres": "MANUEL",
    "ci": "2238260",
    "expedido": "LA PAZ    ",
    "sangre": "NR",
    "fecha_nac": "1957-12-26T04:00:00.000Z",
    "edad": 59,
    "lugar_nac": "LA PAZ INGAVI TARACO",
    "sexo": 0,
    "direccion": "Z. 16 DE JULIO C. PASCOE N°2986",
    "id_depto": 2,
    "id_provincia": 201,
    "id_municipio": 20105,
    "canton": null,
    "comunidad": null,
    "telefono": "",
    "celular": "",
    "estado_civil": 2,
    "nro_hijos": 6,
    "vive_con": 1,
    "nombre_insitucion": "NR",
    "vivienda": 4,
    "seguro": 3,
    "idiomas": 12,
    "o_idioma": "NR",
    "lee": 0,
    "lee_b": 0,
    "esp_lee": "NR",
    "escribir": 0,
    "esc_b": 0,
    "esp_escribir": "NR",
    "ed_especial": 1,
    "cuantos": 0,
    "institucion_edu": "NR",
    "ed_especial_actual": 1,
    "cuantos_actual": 0,
    "institucion_esp_actual": "NR",
    "oficio": "CHOFER",
    "ejerce": 1,
    "oficio_actual": 7,
    "otros_ocupacion": "AYUDA LABORES DE CASA",
    "oficio_anterior": 7,
    "otros_anterior": "CHOFER",
    "reha": 1,
    "esp_reha": "NR",
    "institucion_reha": "NR",
    "reha_actual": 1,
    "esp_reha_actual": "NR",
    "institucion_reha_actual": "NR",
    "flag": 0,
    "impresiones": 1,
    "certificado": 0,
    "causas_disca": "NR",
    "completado": 1,
    "nro_formulario": "110845",
    "tcertificado": [
      {
        "id_certificado": "19571226MCF",
        "id_registro": "19571226MCF",
        "fecha_cer": "2013-04-07T04:00:00.000Z",
        "def_otras": "NR",
        "dis_otras": "NR",
        "ayuda_permanente": 1,
        "causa_def": "NR",
        "edad_ano": 59,
        "edad_mes": 0,
        "diagnostico": "INSUFICIENCIA RENAL CRONICA N18",
        "man_clinicas": "HEMODIALISIS CONTINUA ",
        "grados_disc": 3,
        "tipo_disc": 1,
        "deficiencia": 8,
        "autonomia": 8,
        "porcentaje": 55,
        "literal": "CINCUENTA Y CINCO",
        "ninguna": 0,
        "revalorizacion": "2021-04-04T04:00:00.000Z",
        "rehabilitacion": "TRANSPLANTE RENAL",
        "terapia_fisica": null,
        "recomendacion": "MAQUINA ",
        "caracteristicas": "HEMODIALISIS",
        "flag": 1
      }
    ]
  }
 */
router.get('/:ci', function(req, res, next) {
  var ci = req.params.ci;
  const sequelize = req.app.db.sequelize;
  req.app.db.models.registro.findAll({
    include: [
      {
        model: req.app.db.models.certificado,
        as: 'tcertificado',
        required: false
      }
    ],
    where: { ci: ci }
  })
  .then(result => {
    if (result.length === 1) {
      res.json(result[0]);
    } else {
      res.json({});
    }
  }).catch(error => {
    let msg = '(SIPRUNPCD) Error inesperado.';
    if (error.name === 'SequelizeConnectionError' || 
            error.name === 'SequelizeHostNotReachableError' || 
            error.name === 'SequelizeConnectionRefusedError') {
      msg = 'No se pudo conectar a la base de datos de SIPRUNPCD.';
    }
    res.json({
      finalizado: false,
      mensaje: msg,
      datos: null
    });
  });
});

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Get interoperabilidad dinamico por nombre
 * @api {get} /api/v2/dinamico/:ci/:nombre Interoperabilidad dinámico nombre
 * @apiParam (Parámetros) {string} ci Documento de Identidad de la persona con discapacidad
 * @apiParam (Parámetros) {string} nombre Nombre o parte del nombre de la persona con discapacidad
 * @apiDescription Get para obtención de certificación de discapacidad
 *
 * @apiSuccessExample {json} Respuesta del Ejemplo:
 * HTTP/1.1 200 OK
  [
    {
      "id_registro": "19571226MCF",
      "id_anterior": null,
      "id_dept": 2,
      "fecha_reg": "2017-04-06T04:00:00.000Z",
      "fecha_upd": "2017-04-07T13:40:27.000Z",
      "id_usuario": 239,
      "resp_registro": "CODEPEDIS LP",
      "resp_carnet": "CODEPEDIS LP",
      "res_unidad": "SEDES LA PAZ",
      "id_institucion": 389,
      "ap_paterno": "CALLISAYA",
      "ap_materno": "FLORES",
      "nombres": "MANUEL",
      "ci": "2238260",
      "expedido": "LA PAZ    ",
      "sangre": "NR",
      "fecha_nac": "1957-12-26T04:00:00.000Z",
      "edad": 59,
      "lugar_nac": "LA PAZ INGAVI TARACO",
      "sexo": 0,
      "direccion": "Z. 16 DE JULIO C. PASCOE N°2986",
      "id_depto": 2,
      "id_provincia": 201,
      "id_municipio": 20105,
      "canton": null,
      "comunidad": null,
      "telefono": "",
      "celular": "",
      "estado_civil": 2,
      "nro_hijos": 6,
      "vive_con": 1,
      "nombre_insitucion": "NR",
      "vivienda": 4,
      "seguro": 3,
      "idiomas": 12,
      "o_idioma": "NR",
      "lee": 0,
      "lee_b": 0,
      "esp_lee": "NR",
      "escribir": 0,
      "esc_b": 0,
      "esp_escribir": "NR",
      "ed_especial": 1,
      "cuantos": 0,
      "institucion_edu": "NR",
      "ed_especial_actual": 1,
      "cuantos_actual": 0,
      "institucion_esp_actual": "NR",
      "oficio": "CHOFER",
      "ejerce": 1,
      "oficio_actual": 7,
      "otros_ocupacion": "AYUDA LABORES DE CASA",
      "oficio_anterior": 7,
      "otros_anterior": "CHOFER",
      "reha": 1,
      "esp_reha": "NR",
      "institucion_reha": "NR",
      "reha_actual": 1,
      "esp_reha_actual": "NR",
      "institucion_reha_actual": "NR",
      "flag": 0,
      "impresiones": 1,
      "certificado": 0,
      "causas_disca": "NR",
      "completado": 1,
      "nro_formulario": "110845",
      "tcertificado": [
        {
          "id_certificado": "19571226MCF",
          "id_registro": "19571226MCF",
          "fecha_cer": "2013-04-07T04:00:00.000Z",
          "def_otras": "NR",
          "dis_otras": "NR",
          "ayuda_permanente": 1,
          "causa_def": "NR",
          "edad_ano": 59,
          "edad_mes": 0,
          "diagnostico": "INSUFICIENCIA RENAL CRONICA N18",
          "man_clinicas": "HEMODIALISIS CONTINUA ",
          "grados_disc": 3,
          "tipo_disc": 1,
          "deficiencia": 8,
          "autonomia": 8,
          "porcentaje": 55,
          "literal": "CINCUENTA Y CINCO",
          "ninguna": 0,
          "revalorizacion": "2021-04-04T04:00:00.000Z",
          "rehabilitacion": "TRANSPLANTE RENAL",
          "terapia_fisica": null,
          "recomendacion": "MAQUINA ",
          "caracteristicas": "HEMODIALISIS",
          "flag": 1
        }
      ]
    }
  ]
 */
router.get('/:ci/:nombre', function(req, res, next) {
  var ci = req.params.ci;
  var nombre = req.params.nombre;
  const sequelize = req.app.db.sequelize;
  var a;
  var b;
  if (sequelize.options.dialect === 'mssql') {
    a = `nombres + ' ' + coalesce(nullif(ap_paterno, '') + ' ', '') + coalesce(nullif(ap_materno, ''), '')`;
    b = `coalesce(nullif(ap_paterno, '') + ' ', '') + coalesce(nullif(ap_materno, '') + ' ', '') + nombres`;
  } else {
    a = `nombres || ' ' || coalesce(nullif(ap_paterno, '') || ' ', '') || coalesce(nullif(ap_materno, ''), '')`;
    b = `coalesce(nullif(ap_paterno, '') || ' ', '') || coalesce(nullif(ap_materno, '') || ' ', '') || nombres`;
  }
  req.app.db.models.registro.findAll({
    include: [
      {
        model: req.app.db.models.certificado,
        as: 'tcertificado',
        required: false
      }
    ],
    where: {
      $or: [
        {
          ci: ci
        },
        sequelize.where(sequelize.literal(a), { $like: `%${nombre.toUpperCase().split(' ').join('%')}%` }),
        sequelize.where(sequelize.literal(b), { $like: `%${nombre.toUpperCase().split(' ').join('%')}%` })
      ]
    }
  })
  .then(result => {
    if (result.length === 1) {
      res.json(result);
    } else {
      res.json([]);
    }
  }).catch(error => {
    let msg = '(SIPRUNPCD) Error inesperado.';
    if (error.name === 'SequelizeConnectionError' || 
            error.name === 'SequelizeHostNotReachableError' || 
            error.name === 'SequelizeConnectionRefusedError') {
      msg = 'No se pudo conectar a la base de datos de SIPRUNPCD.';
    }
    res.json({
      finalizado: false,
      mensaje: msg,
      datos: null
    });
  });
});

module.exports = router;
