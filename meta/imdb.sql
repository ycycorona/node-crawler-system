/*
 Navicat Premium Data Transfer

 Source Server         : aliyunecs
 Source Server Type    : MySQL
 Source Server Version : 50641
 Source Host           : 47.105.46.120:3306
 Source Schema         : imdb

 Target Server Type    : MySQL
 Target Server Version : 50641
 File Encoding         : 65001

 Date: 13/02/2019 09:43:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for acted_in
-- ----------------------------
DROP TABLE IF EXISTS `acted_in`;
CREATE TABLE `acted_in`  (
  `idacted_in` int(11) NOT NULL AUTO_INCREMENT,
  `idmovies` int(11) NOT NULL,
  `idseries` int(11) NULL DEFAULT NULL,
  `idactors` int(11) NOT NULL,
  `character` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `billing_position` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idacted_in`) USING BTREE,
  INDEX `ACTED_IN_IDSERIES_INDEX`(`idseries`) USING BTREE,
  INDEX `ACTED_IN_IDMOVIES_INDEX`(`idmovies`) USING BTREE,
  INDEX `ACTED_IN_IDACTORS_INDEX`(`idactors`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for actors
-- ----------------------------
DROP TABLE IF EXISTS `actors`;
CREATE TABLE `actors`  (
  `idactors` int(11) NOT NULL AUTO_INCREMENT,
  `lname` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fname` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `mname` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `gender` int(11) NOT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idactors`) USING BTREE,
  INDEX `ACTORS_LASTNAME_INDEX16`(`lname`(16)) USING BTREE,
  INDEX `ACTORS_FIRSTNAME_INDEX16`(`fname`(16)) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for aka_names
-- ----------------------------
DROP TABLE IF EXISTS `aka_names`;
CREATE TABLE `aka_names`  (
  `idaka_names` int(11) NOT NULL AUTO_INCREMENT,
  `idactors` int(11) NOT NULL,
  `name` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`idaka_names`) USING BTREE,
  INDEX `AKA_NAMES_IDACTORS_INDEX`(`idactors`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for aka_titles
-- ----------------------------
DROP TABLE IF EXISTS `aka_titles`;
CREATE TABLE `aka_titles`  (
  `idaka_titles` int(11) NOT NULL AUTO_INCREMENT,
  `idmovies` int(11) NOT NULL,
  `title` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `location` varchar(127) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `year` year NULL DEFAULT NULL,
  PRIMARY KEY (`idaka_titles`) USING BTREE,
  INDEX `AKA_TITLES_IDMOVIES_INDEX`(`idmovies`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for genres
-- ----------------------------
DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres`  (
  `idgenres` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(127) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`idgenres`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for keywords
-- ----------------------------
DROP TABLE IF EXISTS `keywords`;
CREATE TABLE `keywords`  (
  `idkeywords` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(127) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`idkeywords`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for movies
-- ----------------------------
DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies`  (
  `idmovies` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `year` year NOT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `location` varchar(127) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `language` varchar(127) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idmovies`) USING BTREE,
  INDEX `MOVIES_TITLE_INDEX16`(`title`(16)) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for movies_genres
-- ----------------------------
DROP TABLE IF EXISTS `movies_genres`;
CREATE TABLE `movies_genres`  (
  `idmovies_genres` int(11) NOT NULL AUTO_INCREMENT,
  `idmovies` int(11) NOT NULL,
  `idgenres` int(11) NOT NULL,
  `idseries` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idmovies_genres`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for movies_keywords
-- ----------------------------
DROP TABLE IF EXISTS `movies_keywords`;
CREATE TABLE `movies_keywords`  (
  `idmovies_keywords` int(11) NOT NULL AUTO_INCREMENT,
  `idmovies` int(11) NOT NULL,
  `idkeywords` int(11) NOT NULL,
  `idseries` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idmovies_keywords`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for series
-- ----------------------------
DROP TABLE IF EXISTS `series`;
CREATE TABLE `series`  (
  `idseries` int(11) NOT NULL AUTO_INCREMENT,
  `idmovies` int(11) NOT NULL,
  `name` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idseries`) USING BTREE,
  INDEX `SERIES_IDMOVIES_INDEX`(`idmovies`) USING BTREE,
  INDEX `SERIES_NAME_INDEX16`(`name`(16)) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `idseries` int(11) NOT NULL AUTO_INCREMENT,
  `idmovies` int(11) NULL DEFAULT NULL,
  `name` varchar(1023) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT 123,
  `date` datetime(0) NOT NULL,
  `timestamp` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idseries`) USING BTREE,
  INDEX `SERIES_IDMOVIES_INDEX`(`idmovies`) USING BTREE,
  INDEX `SERIES_NAME_INDEX16`(`name`(16)) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES (1, 2, '', NULL, 123, '0000-00-00 00:00:00', NULL);
INSERT INTO `test` VALUES (5, NULL, NULL, NULL, 123, '2018-12-12 18:38:18', NULL);
INSERT INTO `test` VALUES (6, NULL, '123', NULL, 123, '2010-02-02 00:00:00', NULL);
INSERT INTO `test` VALUES (7, NULL, '123', NULL, 123, '2010-02-02 00:00:00', NULL);
INSERT INTO `test` VALUES (8, NULL, 'qq', NULL, 123, '2010-02-02 00:00:00', NULL);
INSERT INTO `test` VALUES (9, NULL, 'ycy', NULL, 123, '2010-02-02 00:00:00', '2010-02-02 12:00:00');
INSERT INTO `test` VALUES (10, NULL, 'test', NULL, 123, '2018-12-27 22:59:09', '2018-12-27 22:59:09');
INSERT INTO `test` VALUES (11, NULL, 'test', NULL, 123, '2018-12-27 23:03:06', '2018-12-27 23:03:06');

SET FOREIGN_KEY_CHECKS = 1;
