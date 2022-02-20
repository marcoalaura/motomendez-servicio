var moment = require('moment');
var express = require('express');
var router = express.Router();

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Get Nuevos
 * @api {get} /api/v2/pcd2/listapcd?fecha_inicio=01/01/2017&fecha_fin=28/01/2017 Obtener lista de nuevos registros
 * @apiParam (Parámetro) {string} fecha_inicio Fecha a partir del cual se quieren obtener los nuevos registros y actualizaciones
 * @apiParam (Parámetro) {string} fecha_fin Fecha hasta el cual se quieren obtener los nuevos registros y actualizaciones
 * @apiDescription Get para obtención de lista de nuevos registro por rango de fechas y con porcentaje mayor o igual a 30
 *
 * @apiSuccess {String} mensaje Mensaje de la respuesta.
 * @apiSuccess {Object} datos Datos de la respuesta.
 * @apiSuccess {String} datos.id_registro  Identificador del registro.
 * @apiSuccess {String} datos.ci  Cédula de identidad de la persona.
 * @apiSuccess {String} datos.expedido Departamento expedido de la cédula de identidad de la persona.
 * @apiSuccess {String} datos.ap_paterno Apellido paterno de la persona.
 * @apiSuccess {String} datos.ap_materno Apellido materno de la persona.
 * @apiSuccess {String} datos.nombres Nombre(s) de la persona.
 * @apiSuccess {String} datos.fecha_nac Fecha de nacimiento de la persona.
 * @apiSuccess {String} datos.sexo Sexo de la persona FEMENINO/MASCULINO.
 * @apiSuccess {String} datos.estado_civil Estado civil de la persona.
 * @apiSuccess {String} datos.celular Celular de la persona.
 * @apiSuccess {String} datos.direccion Dirección de la persona.
 * @apiSuccess {String} datos.id_municipio Código gel municipio.
 * @apiSuccess {String} datos.comunidad Nombre de la comunidad.
 * @apiSuccess {String} datos.exp_departamento * Departamento expedido de la cédula de identidad de la persona.
 * @apiSuccess {String} datos.nro_documento * Cédula de identidad de la persona.
 * @apiSuccess {String} datos.complemento * Complemento de la cédula de identidad de la persona.
 * @apiSuccess {String} datos.primer_apellido * Primer apellido de la persona.
 * @apiSuccess {String} datos.segundo_apellido * Segundo apellido de la persona.
 * @apiSuccess {String} datos.apellido_casada * Apellido de casada de la persona.
 * @apiSuccess {String} datos.nombre_completo * Nombre(s) de la persona.
 * @apiSuccess {String} datos.fecha_nacimiento * Fecha de nacimiento de la persona.
 * @apiSuccess {String} datos.estadocivil * Estado civil de la persona.
 * @apiSuccess {String} datos.formato_inf * Fomato de impresión de los datos personales en el carnet.
 * @apiSuccess {String} datos.valsegip * Indica si el registro tiene observación (0=tiene observación, 1=sin observacion, null=no verificado).
 * @apiSuccess {String} datos.obsvalsegip * Observación del registro.
 * @apiSuccess {String} datos.primer_envio * Atributo que indica si el registro fue enviado para el primer corte (1=enviado).
 * @apiSuccess {Object[]} datos.tcertificado Lista de los certificados de discapacidad que ha tenido y tiene la persona.
 * @apiSuccess {String} datos.tcertificado.id_certificado Identificador certificado.
 * @apiSuccess {String} datos.tcertificado.fecha_cer Fecha de emisión del certificado.
 * @apiSuccess {String} datos.tcertificado.tipo_disc Tipo de discapacidad.
 * @apiSuccess {String} datos.tcertificado.grados_disc Grado de discapacidad.
 * @apiSuccess {Integer} datos.tcertificado.porcentaje Porcentaje de discapacidad obtenido en su calificación.
 * @apiSuccess {String} datos.tcertificado.fecha_vig Fecha de vigencia del certificado.
 *
 * @apiSuccessExample {json} Respuesta del Ejemplo:
 * HTTP/1.1 200 OK
 {
   "finalizado": true,
   "mensaje": "Se encontron nuevos registros.",
   "datos": [
        {
            "id_registro": "19530713EMA",
            "ci": "1986760",
            "expedido": "7",
            "ap_paterno": "MOLINA",
            "ap_materno": "ARANDIA",
            "nombres": "ELDA",
            "fecha_nac": "13/07/1953",
            "sexo": "FEMENINO",
            "estado_civil": "S",
            "celular": "",
            "direccion": "C. SANTA BARBARA # 58",
            "id_municipio": 70101,
            "comunidad": null,
            "exp_departamento": 7,
            "nro_documento": "1986760",
            "complemento": "",
            "primer_apellido": "MOLINA",
            "segundo_apellido": "ARANDIA",
            "apellido_casada": "",
            "nombre_completo": "ELDA",
            "fecha_nacimiento": "13/07/1953",
            "estadocivil": "S",
            "formato_inf": "NUAC",
            "valsegip": 1,
            "obsvalsegip": "DATOS CORRECTOS",
            "primer_envio": 1,
            "tcertificado": [
                {
                    "id_certificado": "19530713EMA",
                    "fecha_cer": "07/06/2017",
                    "tipo_disc": "INTELECTUAL",
                    "grados_disc": "GRAVE",
                    "porcentaje": 52,
                    "fecha_vig": "07/06/2021"
                }
            ]
        },
        ....
   ]
 }
 */
router.get('/listapcd', function (req, res, next) {
  const sequelize = req.app.db.sequelize;
  let resultado;
  const idsRegistro = [];
  const idsRegistroNulos = [];
  if (req.query.fecha_inicio && req.query.fecha_fin) {
    let fecha_inicio, fecha_fin, fecha_nac, fecha_cer, fecha_vig;
    if (sequelize.options.dialect === 'mssql') {
      fecha_inicio = moment(req.query.fecha_inicio, 'DD/MM/YYYY').format('MM/DD/YYYY');
      fecha_fin = moment(req.query.fecha_fin, 'DD/MM/YYYY').format('MM/DD/YYYY');
      fecha_nac = `CONVERT(NVARCHAR, fecha_nac, 103)`;
      fecha_cer = `CONVERT(NVARCHAR, fecha_cer, 103)`;
      fecha_vig = `CONVERT(NVARCHAR, DATEADD(year,4,fecha_cer), 103)`;
      fecha_nacimiento = `CONVERT(NVARCHAR, fecha_nacimiento, 103)`;
    } else {
      fecha_inicio = moment(req.query.fecha_inicio, 'DD/MM/YYYY').format();
      fecha_fin = moment(req.query.fecha_fin, 'DD/MM/YYYY').format();
      fecha_nac = `to_char(fecha_nac, 'DD/MM/YYYY')`;
      fecha_cer = `to_char(fecha_cer, 'DD/MM/YYYY')`;
      fecha_vig = `to_char((SELECT fecha_cer + INTERVAL '4 year'), 'DD/MM/YYYY')`;
      fecha_nacimiento = `to_char(fecha_nacimiento, 'DD/MM/YYYY')`;
    }
    const parametros = {
      attributes: [
        'id_registro',
        'ci', 
        [sequelize.literal(`CASE expedido
        WHEN 'CHUQUISACA' THEN '1'
        WHEN 'LA PAZ' THEN '2'
        WHEN 'COCHABAMBA' THEN '3'
        WHEN 'ORURO' THEN '4'
        WHEN 'POTOSI' THEN '5'
        WHEN 'TARIJA' THEN '6'
        WHEN 'SANTA CRUZ' THEN '7'
        WHEN 'BENI' THEN '8'
        WHEN 'PANDO' THEN '9' END`), 'expedido'],
        [sequelize.literal(`rtrim(ltrim(ap_paterno))`), 'ap_paterno'],
        [sequelize.literal(`rtrim(ltrim(ap_materno))`), 'ap_materno'],
        [sequelize.literal(`rtrim(ltrim(nombres))`), 'nombres'],
        [sequelize.literal(fecha_nac), 'fecha_nac'],
        [sequelize.literal(`CASE sexo
        WHEN '0' THEN 'MASCULINO'
        WHEN '1' THEN 'FEMENINO' END`), 'sexo'],
        [sequelize.literal(`CASE estado_civil
        WHEN '0' THEN 'S'
        WHEN '1' THEN 'C'
        WHEN '2' THEN 'V'
        WHEN '3' THEN 'D'
        WHEN '4' THEN 'S'
        WHEN '5' THEN 'S' 
        END`), 'estado_civil'],
        'celular',
        'direccion',
        'id_municipio',
        'comunidad',
        'exp_departamento',
        'nro_documento',
        'complemento',
        'primer_apellido',
        'segundo_apellido',
        'apellido_casada',
        'nombre_completo',
        [sequelize.literal(fecha_nacimiento), 'fecha_nacimiento'],
        'estadocivil',
        'formato_inf',
        'valsegip',
        'obsvalsegip',
        'primer_envio',
      ],
      include: [{
        attributes: [
          'id_certificado', 
          [sequelize.literal(fecha_cer), 'fecha_cer'],
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
          [sequelize.literal(fecha_vig), 'fecha_vig']
        ],
        model: req.app.db.models.certificado,
        as: 'tcertificado',
        required: true,
        where: {
          porcentaje: { $gte: 30 },
        }
      }],
      where: []
    };
    parametros.where.push({
      $or: [
        sequelize.literal(`("registro"."fecha_reg" >= '${fecha_inicio}' and "registro"."fecha_reg" <= '${fecha_fin}')`),
        sequelize.literal(`("registro"."fecha_upd" >= '${fecha_inicio}' and "registro"."fecha_upd" <= '${fecha_fin}')`),
        sequelize.literal(`("tcertificado"."fecha_cer" >= '${fecha_inicio}' and "tcertificado"."fecha_cer" <= '${fecha_fin}')`),
      ]
    });
    return sequelize.transaction().then((t) => {
      return req.app.db.models.registro.findAll(parametros)
      .then(result => {
        resultado = result;
        for (let j = 0; j < resultado.length; j++) {
          if (resultado[j].ci) {
            idsRegistro.push(resultado[j].id_registro);
          } else {
            idsRegistroNulos.push(resultado[j].id_registro);
          }
        }
        return req.app.db.models.registro.update({
          valsegip: 1,
          obsvalsegip: 'PEMM - Sin Observación',
        }, {
          where: {
            id_registro: idsRegistro,
          },
          transaction: t,
        })
      })
      .then(result => {
        return req.app.db.models.registro.update({
          valsegip: 0,
          obsvalsegip: 'PEMM - No cuenta con ci',
        }, {
          where: {
            id_registro: idsRegistroNulos,
          },
          transaction: t,
        })
      })
      .then(result => {
        t.commit();
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se encontron nuevos registros.',
          datos: resultado
        });
      })
      .catch(error => {
        t.rollback();
        let msg = '(SIPRUNPCD) Error inesperado.';
        console.log(error);
        if (error.name === 'SequelizeConnectionError' ||
          error.name === 'SequelizeHostNotReachableError' ||
          error.name === 'SequelizeConnectionRefusedError') {
          msg = 'No se pudo conectar a la base de datos de SIPRUNPCD.';
        }
        res.status(412).json({
          finalizado: false,
          mensaje: msg,
          datos: null
        });
      });
    });
  } else {
    res.status(412).json({
      finalizado: true,
      mensaje: 'El parámetro fecha_inicio y fecha_fin es requerido.',
      datos: null
    });
  }
});

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Put registro
 * @api {put} /api/v2/pcd2/pcd/:ci Actualizar registro con observación
 * @apiParam (Parámetro) {string} codigo Código que indica si tiene o no observación (0=tiene observación, 1=sin observacion).
 * @apiParam (Parámetro) {string} observacion Observación de registro
 * @apiDescription Put para actualizar registro con alguna observación
 * 
 * @apiParamExample {json} Request-Example:
 *      {
 *        "codigo": "0",
 *        "observacion": "Observado Nombre"
 *      }
 *
 * @apiSuccess {String} mensaje Mensaje de la respuesta.
 * @apiSuccess {Object} datos Datos de la respuesta.
 *
 * @apiSuccessExample {json} Respuesta del Ejemplo:
 * HTTP/1.1 200 OK
 {
   "finalizado": true,
   "mensaje": "Se encontron nuevos registros.",
   "datos": 1
 }
 */
router.put('/pcd/:ci', function (req, res, next) {
  const registro = req.body;
  const ci = req.params.ci;
  if (registro.codigo && registro.observacion) {

    req.app.db.models.registro.update({
      valsegip: registro.codigo,
      obsvalsegip: registro.observacion,
    }, {
      where: {
        ci: ci,
      },
    })
    .then(result => {
      res.status(200).json({
        finalizado: true,
        mensaje: 'Actualización exitosa.',
        datos: 1
      });
    })
    .catch(error => {
      // let msg = '(SIPRUNPCD) Error inesperado.';
      let msg = error.message;
      if (error.name === 'SequelizeConnectionError' ||
        error.name === 'SequelizeHostNotReachableError' ||
        error.name === 'SequelizeConnectionRefusedError') {
        msg = 'No se pudo conectar a la base de datos de SIPRUNPCD.';
      }
      res.status(412).json({
        finalizado: false,
        mensaje: msg,
        datos: null
      });
    });
  } else {
    res.status(412).json({
      finalizado: false,
      mensaje: 'El parámetro \'codigo\' y \'observacion\' es requerido.',
      datos: null
    });
  }
});

/**
 * @apiVersion 1.0.0
 * @apiGroup siprunpcd certificado
 * @apiName Get pcd
 * @api {get} /api/v2/pcd2/pcd/2238260?fecha_nac=26/12/1957&ap_paterno=Callisaya&ap_materno=Flores&nombres=Manuel Obtener certificado de discapacidad
 * @apiParam (Parámetro) {string} ci Documento de Identidad de la persona con discapacidad
 * @apiParam (Parámetro) {string} fecha_nac Fecha de Nacimiento de la persona con discapacidad
 * @apiParam (Parámetro) {string} ap_paterno Apellido paterno de la persona con discapacidad
 * @apiParam (Parámetro) {string} ap_materno Apellido materno de la persona con discapacidad
 * @apiParam (Parámetro) {string} nombres Nombre(s) de la persona con discapacidad
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
 * @apiSuccess {String} datos.valsegip Indica si el registro tiene observación (0=tiene observación, 1=sin observacion, null=no verificado).
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
router.get('/pcd/:ci', function (req, res, next) {
  const sequelize = req.app.db.sequelize;
  var ci = req.params.ci;
  var ap_paterno = req.query.ap_paterno.toUpperCase();
  var ap_materno = req.query.ap_materno.toUpperCase();
  var nombres = req.query.nombres.toUpperCase();
  var fecha_nac_param, fecha_nac, fecha_cer, fecha_vig;
  if (sequelize.options.dialect === 'mssql') {
    fecha_nac_param = moment(req.query.fecha_nac, 'DD/MM/YYYY').format('MM/DD/YYYY');
    fecha_nac = `CONVERT(NVARCHAR, fecha_nac, 103)`;
    fecha_cer = `CONVERT(NVARCHAR, fecha_cer, 103)`;
    fecha_vig = `CONVERT(NVARCHAR, DATEADD(year,4,fecha_cer), 103)`;
  } else {
    fecha_nac_param = moment(req.query.fecha_nac, 'DD/MM/YYYY').format();
    fecha_nac = `to_char(fecha_nac, 'DD/MM/YYYY')`;
    fecha_cer = `to_char(fecha_cer, 'DD/MM/YYYY')`;
    fecha_vig = `to_char((SELECT fecha_cer + INTERVAL '4 year'), 'DD/MM/YYYY')`;
  }
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
        [sequelize.literal(`rtrim(ltrim(ap_paterno))`), 'ap_paterno'],
        [sequelize.literal(`rtrim(ltrim(ap_materno))`), 'ap_materno'],
        [sequelize.literal(`rtrim(ltrim(nombres))`), 'nombres'],
        [sequelize.literal(fecha_nac), 'fecha_nac'],
        [sequelize.literal(`CASE sexo
        WHEN '0' THEN 'MASCULINO'
        WHEN '1' THEN 'FEMENINO' END`), 'sexo'],
        'celular',
        'direccion',
        'valsegip',
        'obsvalsegip'
      ],
      include: [{
        attributes: [
          [sequelize.literal(fecha_cer), 'fecha_cer'],
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
          'porcentaje', [sequelize.literal(`CASE
            WHEN porcentaje < 30 THEN 'NO ACCEDE AL CARNET DE DISCAPACIDAD'
            WHEN porcentaje >= 30 THEN 'ACCEDE AL CARNET DE DISCAPACIDAD' END`), 'observacion'],
          [sequelize.literal(`CASE tcertificado.flag
            WHEN '0' THEN 'NO CUENTA CON EL CARNET DE DISCAPACIDAD'
            WHEN '1' THEN 'CUENTA CON EL CARNET DE DISCAPACIDAD' END`), 'observacion2'],
          [sequelize.literal(fecha_cer), 'fecha_vig']
        ],
        model: req.app.db.models.certificado,
        as: 'tcertificado',
        required: false
      }],
      where: [
        { ci: ci },
        sequelize.where(sequelize.literal(`"registro"."fecha_nac"`), fecha_nac_param),
        sequelize.where(sequelize.literal(`rtrim(ltrim("registro"."ap_paterno"))`), ap_paterno),
        sequelize.where(sequelize.literal(`rtrim(ltrim("registro"."ap_materno"))`), ap_materno),
        sequelize.where(sequelize.literal(`rtrim(ltrim("registro"."nombres"))`), nombres),
      ]
    })
    .then(result => {
      if (result.length === 1) {
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