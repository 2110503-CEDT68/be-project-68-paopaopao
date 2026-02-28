/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the hospital
 *           example: 69998d74647cddcf0a42de32
 *         ลำดับ:
 *           type: string
 *           description: Ordinal number
 *         name:
 *           type: string
 *           description: Hospital name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: Province
 *         postalCode:
 *           type: string
 *           description: 5-digit postal Code
 *         tel:
 *           type: string
 *           description: telephone number
 *         region:
 *           type: string
 *           description: region
 *       example:
 *         id: 69998d74647cddcf0a42de32
 *         ลำดับ: 1
 *         name: โรงพยาบาลบำรุงราษฎร์
 *         address: 1 Soi Sukhumvit 3, Khlong Tan Nuea
 *         district: เขตวัฒนา
 *         province: กรุงเทพมหานคร
 *         postalCode: 10110
 *         tel: 02-011-3000
 *         region: กรุงเทพมหานคร (Bangkok)
 *
 */

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: The hospitals managing API
 */

/**
 * @swagger
 * /hospitals:
 *   get:
 *     summary: returns the list of all the hospitals
 *     tags: [Hospitals]
 *     responses:
 *       200:
 *         description: A list of the hospitals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Hospital"
 */

/**
 * @swagger
 * /hospitals/{id}:
 *   get:
 *     summary: Get the hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     responses:
 *       200:
 *         description: The hospital description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Hospital"
 *       404:
 *         description: Hospital not found
 */

/**
 * @swagger
 * /hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Hospital"
 *     responses:
 *       201:
 *         description: The hospital was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Hospital"
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /hospitals/{id}:
 *   put:
 *     summary: Update the hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Hospital"
 *     responses:
 *       200:
 *         description: The hospital was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Hospital"
 *       404:
 *         description: The hospital was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /hospitals/{id}:
 *   delete:
 *     summary: Remove the hospital by id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     responses:
 *       200:
 *         description: The hospital was deleted
 *       404:
 *         description: The hospital was not found
 */

const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const {
    getHospitals,
    getHospital,
    createHospital,
    updateHospital,
    deleteHospital,
} = require("../controllers/hospitals");

const appointmentRouter = require("./appointments");

router.use("/:hospitalId/appointments/", appointmentRouter);

router
    .route("/")
    .get(getHospitals)
    .post(protect, authorize("admin"), createHospital);
router
    .route("/:id")
    .get(getHospital)
    .put(protect, authorize("admin"), updateHospital)
    .delete(protect, authorize("admin"), deleteHospital);
module.exports = router;
