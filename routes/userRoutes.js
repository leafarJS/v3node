const {Router} = require('express');
const { check } = require("express-validator");

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/userControllers');
const {
  esRolValidado,
  existeEmail,
  existeUsuarioID,
} = require("../helpers/dbValidators");


/* const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { admRol, tieneRol } = require('../middlewares/validarRol'); */
const {validarCampos, validarJWT,admRol, tieneRol} = require('../middlewares')

const router  = Router()

router.get("/", userGet);

    router.put(
      "/:id", 
      [
      check('id', 'No es un ID valido').isMongoId(), 
      check('id').custom(existeUsuarioID),
      check('rol').custom(esRolValidado),
      validarCampos
    ], 
    userPut
    );

    router.post(
      "/",
      [
        check("name", "El nombre es un campo obligatorio").not().isEmpty(),
        check("password", "minimo 6 caracteres").isLength({ min: 6 }),
        check("email", "El nombre del correo no es valido").isEmail(),
        check('email').custom(existeEmail),
        //check("rol", "No es un rol permitido").isIn(["ADMIN_ROL", "USER_ROL"]),
        check('rol').custom(esRolValidado),
        validarCampos
      ],
      userPost
    );

    router.delete(
      "/:id",
      [
       validarJWT,
       // tieneRol("ADMIN_ROL", "USER_ROL"),
        admRol
      ],
      userDelete
    );

    router.patch("/", userPatch);


module.exports = router