var express = require('express');
var router = express.Router();

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Get interoperabilidad
 * @api {get} /api/v2/:ci Interoperabilidad calificación
 * @apiParam (Parámetros) {string} ci Documento de Identidad de la persona con discapacidad
 * @apiDescription Get para obtención de certificación de discapacidad
 *
 * @apiSuccessExample {json} Respuesta del Ejemplo:
 * HTTP/1.1 200 OK
  {
    "ci": "2238260",
    "ap_paterno": "CALLISAYA",
    "ap_materno": "FLORES ",
    "nombres": "MANUEL",
    "fecha_nac": "1957-12-26T00:00:00.000Z",
    "sexo": "M",
    "celular": null,
    "direccion": "Z. 16 DE JULIO C. PASCOE N°2986",
    "tcertificado": [
      {
        "fecha_cer": "2017-04-07T00:00:00.000Z",
        "diagnostico": "INSUFICIENCIA RENAL CRONICA N18",
        "man_clinicas": "HEMODIALISIS CONTINUA ",
        "grados_disc": 3,
        "porcentaje": 55,
        "revalorizacion": "2021-04-04T00:00:00.000Z"
      }
    ]
  }
 */
router.get('/:ci', function(req, res, next) {
  var ci = req.param('ci');
  req.app.db.models.registro.findAll({
    attributes: ['ci', 'ap_paterno', 'ap_materno', 'nombres', 'fecha_nac', 'sexo', 'celular', 'direccion'],
    include: [
      {
        attributes: ['fecha_cer', 'diagnostico', 'man_clinicas', 'grados_disc', 'porcentaje', 'revalorizacion'],
        model: req.app.db.models.certificado,
        as: 'tcertificado',
        required: false
      }
    ],
    where: { ci: ci }
  })
  .then(result => {
    if (result.length === 1) {
      result[0].sexo = (result[0].sexo === 0 ? 'M' : 'F');
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

module.exports = router;
