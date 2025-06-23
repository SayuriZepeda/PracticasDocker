import { Router } from "express";
import { createProduct , getProductById, updateProduct, deleteProduct, getProducts } from "./handlers/products";
import { createClient } from "./handlers/client";
import { body, param} from "express-validator";
import { handleInputerrors } from './middleware';

const router = Router();
router.get('/', getProducts); //products

router.get('/:id',
    param('id').isInt().withMessage('el id debe ser un numero entero'),
    handleInputerrors,
    getProductById)

router.post('/', 
    body('name')
    .notEmpty().withMessage('Nombre requerido'),
    body('price')
    .isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('el precio del producto no puede ir vacio')
    .custom((value => value > 0)).withMessage('el precio no es valido'),
    handleInputerrors,
    createProduct);

router.post('/', 
    body('nombre')
    .notEmpty().withMessage('Nombre requerido'),
    body('apellido')
    .notEmpty().withMessage('Apellido requerido'),
    body('telefono')
    .notEmpty().withMessage('Telefono requerido')
    .custom((value => value > 0)).withMessage('el telefono no es valido'),
    handleInputerrors,
    createClient)

router.put('/:id',
    body('name')
    .notEmpty().withMessage('el nombre no puede ir vacio'),
    body('price')
    .isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('el precio del producto no puede ir vacio')
    .custom((value => value > 0)).withMessage('el precio no es valido'),
    body('disponibility')
    .isBoolean().withMessage('el valor de disponibilidad no es valido'),
    handleInputerrors,
    updateProduct)

router.delete('/:id',
    param('id').isInt().withMessage('el id debe ser un numero entero'),
    handleInputerrors,
    deleteProduct)

export default router;