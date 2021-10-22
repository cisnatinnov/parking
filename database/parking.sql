/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MariaDB
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : parking

 Target Server Type    : MariaDB
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 17/02/2021 17:15:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `menu` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES (1, 'Admin', 'benefits', 'setting');
INSERT INTO `access` VALUES (2, 'Keuangan', 'reports');
INSERT INTO `access` VALUES (3, 'Petugas', 'vehicles');

-- ----------------------------
-- Table structure for car_benefits
-- ----------------------------
DROP TABLE IF EXISTS `car_benefits`;
CREATE TABLE `car_benefits`  (
  `car_id` int(11) NOT NULL,
  `car_number` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NULL DEFAULT NULL,
  `rate` int(11) NULL DEFAULT NULL,
  `total_rate` int(11) NULL DEFAULT NULL,
  `persen` decimal(11, 2) NOT NULL,
  `benefits` int(11) NOT NULL,
  `status` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` date NULL DEFAULT NULL,
  `approved_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `car_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of car_benefits
-- ----------------------------
INSERT INTO `car_benefits` VALUES (7, 'T 1122 TE', 6, NULL, 2101, 6000, 0.65, 3899, 'Disetujui', '2020-11-08', '2020-11-08');
INSERT INTO `car_benefits` VALUES (8, 'T 2123 TE', 7, NULL, 435, 3000, 0.86, 2565, 'Disetujui', '2020-11-09', '2020-11-09');
INSERT INTO `car_benefits` VALUES (7, 'T 1122 TE', 8, NULL, 4201, 12000, 0.65, 7799, 'Disetujui', '2020-11-09', '2020-11-09');

-- ----------------------------
-- Table structure for cars
-- ----------------------------
DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NULL DEFAULT NULL,
  `type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `merk` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `length` decimal(11, 2) NOT NULL,
  `width` decimal(11, 2) NULL DEFAULT NULL,
  `heigth` decimal(11, 2) NOT NULL,
  `volume` decimal(11, 2) NOT NULL,
  `number` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `in` time(0) NOT NULL,
  `out` time(0) NULL DEFAULT NULL,
  `status` enum('Masuk','Keluar') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` date NULL DEFAULT NULL,
  `update_at` date NULL DEFAULT NULL,
  `approved_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cars
-- ----------------------------
INSERT INTO `cars` VALUES (7, NULL, 'Minibus', 'Xenia', 5.01, 1.74, 1.73, 15.08, 'T 1122 TE', '06:31:45', '10:49:31', 'Keluar', '2020-11-08', '2020-11-09', '2020-11-09');
INSERT INTO `cars` VALUES (8, NULL, 'Minibus', 'Avanza', 4.72, 1.71, 1.42, 11.46, 'T 2123 TE', '10:26:43', '10:49:16', 'Keluar', '2020-11-09', '2020-11-09', '2020-11-09');

-- ----------------------------
-- Table structure for motorcycle_benefits
-- ----------------------------
DROP TABLE IF EXISTS `motorcycle_benefits`;
CREATE TABLE `motorcycle_benefits`  (
  `motorcycle_id` int(11) NOT NULL,
  `motorcycle_number` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NULL DEFAULT NULL,
  `persen` decimal(11, 2) NULL DEFAULT NULL,
  `rate` int(11) NULL DEFAULT NULL,
  `total_rate` int(11) NULL DEFAULT NULL,
  `benefit` int(11) NOT NULL,
  `status` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` date NULL DEFAULT NULL,
  `approved_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motorcycle_benefits
-- ----------------------------
INSERT INTO `motorcycle_benefits` VALUES (3, 'T 1638 YP', 7, NULL, 0.95, 50, 1000, 950, 'Disetujui', '2020-11-08', '2020-11-08');
INSERT INTO `motorcycle_benefits` VALUES (4, 'T 1324 DE', 8, NULL, 0.98, 20, 1000, 980, 'Disetujui', '2020-11-09', '2020-11-09');

-- ----------------------------
-- Table structure for motorcycles
-- ----------------------------
DROP TABLE IF EXISTS `motorcycles`;
CREATE TABLE `motorcycles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NULL DEFAULT NULL,
  `type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `merk` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `in` time(0) NOT NULL,
  `out` time(0) NULL DEFAULT NULL,
  `status` enum('Masuk','Keluar') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` date NULL DEFAULT NULL,
  `update_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motorcycles
-- ----------------------------
INSERT INTO `motorcycles` VALUES (3, NULL, 'Matik', 'Vario', 'T 1638 YP', '06:53:11', '07:07:29', 'Keluar', '2020-11-08', '2020-11-08');
INSERT INTO `motorcycles` VALUES (4, NULL, 'Bebek', 'Vega', 'T 1324 DE', '10:28:05', '10:28:37', 'Keluar', '2020-11-09', '2020-11-09');

-- ----------------------------
-- Table structure for persons
-- ----------------------------
DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons`  (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NULL DEFAULT NULL,
  `first_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birth_place` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birth_date` date NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `village` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `districts` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `province` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pos_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` datetime(0) NULL DEFAULT NULL,
  `create_by` int(11) NULL DEFAULT NULL,
  `update_at` datetime(0) NULL DEFAULT NULL,
  `update_by` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of persons
-- ----------------------------
INSERT INTO `persons` VALUES (2, 1, NULL, 'Mohamad', 'Cendikia Isnatinnnov', 'Hairy', 'Bandung', '1993-07-25', 'Kp. Dawuan Oncom, RT 006/005', 'Dawuan Kaler', 'Dawuan', 'Subang', 'Jawa Barat', '41270', '2020-11-08 14:01:56', NULL, NULL, NULL);
INSERT INTO `persons` VALUES (3, 2, NULL, 'Rini', '', 'Mulyani', 'Subang', '1996-05-01', 'Kp.', '-', '-', '-', '-', '-', '2020-11-08 00:00:00', NULL, NULL, NULL);
INSERT INTO `persons` VALUES (4, 3, NULL, 'Diki', NULL, 'Tinnnov', 'Subang', '2020-11-08', '-', '-', '-', '-', '-', '-', '2020-11-08 00:00:00', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `access_id` int(11) NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` datetime(0) NULL DEFAULT NULL,
  `update_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `access_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Mohamad Cendikia Isnatinnnov Hairy', 2, 'cisnatinnov@gmail.com', 'MTMyNDM1', '2020-11-08 14:01:42', NULL);
INSERT INTO `users` VALUES (2, 'Rini Mulyani', 3, 'rini.m@gmail.com', 'MTMyNDM1', '2020-11-08 00:00:00', NULL);
INSERT INTO `users` VALUES (3, 'Diki Tinnnov', 4, 'diki@gmail.com', 'MTMyNDM1', '2020-11-08 00:00:00', NULL);

SET FOREIGN_KEY_CHECKS = 1;
