/*
 Navicat Premium Data Transfer

 Source Server         : aliyunecs
 Source Server Type    : MySQL
 Source Server Version : 50641
 Source Host           : 47.105.46.120:3306
 Source Schema         : media_db

 Target Server Type    : MySQL
 Target Server Version : 50641
 File Encoding         : 65001

 Date: 13/02/2019 09:41:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for aka_names
-- ----------------------------
DROP TABLE IF EXISTS `aka_names`;
CREATE TABLE `aka_names`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_person` int(11) NOT NULL COMMENT '人员id',
  `aka_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '人的其他名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for aka_titles
-- ----------------------------
DROP TABLE IF EXISTS `aka_titles`;
CREATE TABLE `aka_titles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pro` int(11) NOT NULL,
  `aka_title` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for cast
-- ----------------------------
DROP TABLE IF EXISTS `cast`;
CREATE TABLE `cast`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pro` int(11) NOT NULL,
  `id_person` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `priority` int(11) NOT NULL DEFAULT 1 COMMENT '权重值',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_id_pro`(`id_pro`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_user` int(11) NOT NULL COMMENT '创建人',
  `id_pro` int(11) NOT NULL,
  `floor` int(11) NOT NULL COMMENT '楼层',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for persons
-- ----------------------------
DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `uid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '全名',
  `gender` tinyint(1) NOT NULL DEFAULT 3 COMMENT '性别 1男 0女',
  `en_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '英文名',
  `cn_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '中文名',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `nation` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '国家',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `idp_javbus` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_uid`(`uid`) USING BTREE,
  UNIQUE INDEX `idx_id_javbus`(`idp_javbus`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 68 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of persons
-- ----------------------------
INSERT INTO `persons` VALUES (19, 'DKa4ToFDPluQTPE8_0Dwb', '春原未来', 0, 'Miki Sunohara', '春原', '1991-11-23', 'JP', 1, '2018-12-28 23:12:22', '2018-12-29 15:35:04', NULL);
INSERT INTO `persons` VALUES (67, 'ABz2FjrdeR3ixASzIYqqV', '明日花キララ', 0, 'xiangxiang香', '香香', '1988-10-02', 'JP', 1, '2018-12-28 23:42:34', '2018-12-29 14:40:13', NULL);

-- ----------------------------
-- Table structure for productions
-- ----------------------------
DROP TABLE IF EXISTS `productions`;
CREATE TABLE `productions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'uuid字段 展示给用户',
  `com_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '作品番号',
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '作品标题',
  `pub_date` date NULL DEFAULT NULL COMMENT '发行日期',
  `location` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '地区',
  `cover` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '封面图片url地址',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `id_review` int(11) NULL DEFAULT NULL COMMENT '评论的id',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `id_user_create_by` int(11) NOT NULL,
  `id_user_update_by` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_uid`(`uid`) USING BTREE,
  INDEX `idx_com_id`(`com_id`) USING BTREE,
  INDEX `idx_title`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pros_tags_r
-- ----------------------------
DROP TABLE IF EXISTS `pros_tags_r`;
CREATE TABLE `pros_tags_r`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pro` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for replys
-- ----------------------------
DROP TABLE IF EXISTS `replys`;
CREATE TABLE `replys`  (
  `id` int(11) NOT NULL,
  `id_comment` int(11) NOT NULL COMMENT '所属的评论id',
  `reply` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_user_from` int(11) NOT NULL COMMENT '回复的作者',
  `id_user_to` int(11) NOT NULL COMMENT '回复给谁',
  `floor` int(11) NOT NULL COMMENT '回复的楼层 从1开始',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_pro` int(11) NOT NULL,
  `review` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_user` int(11) NOT NULL COMMENT '创建人的id',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '人员类型：演员ac 导员di 编剧sw',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for series
-- ----------------------------
DROP TABLE IF EXISTS `series`;
CREATE TABLE `series`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pro` int(11) NOT NULL COMMENT '作品id',
  `series` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '系列',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user_auths
-- ----------------------------
DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `auth_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '授权的类型',
  `identifier` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '给定授权方式的登录名',
  `token` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '给定授权方式的授权码',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_auths
-- ----------------------------
INSERT INTO `user_auths` VALUES (1, 1, 'passwd', 'root', '066ee651558e4dff23efdc47e6f8f92b', 1);
INSERT INTO `user_auths` VALUES (2, 2, 'passwd', 'ycy421', '066ee651558e4dff23efdc47e6f8f92b', 1);
INSERT INTO `user_auths` VALUES (3, 3, 'passwd', 'ycycorona', '066ee651558e4dff23efdc47e6f8f92b', 1);
INSERT INTO `user_auths` VALUES (11, 0, 'passwd', 'whh', '066ee651558e4dff23efdc47e6f8f92b', 1);

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_role` tinyint(3) NOT NULL COMMENT '用户类型',
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (1, 0, 1);
INSERT INTO `user_roles` VALUES (2, 1, 1);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `avatar` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户头像链接',
  `nick_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `create_time` datetime(0) NOT NULL,
  `update_time` datetime(0) NOT NULL,
  `id_user_create_by` int(11) NOT NULL,
  `id_user_update_by` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'root', 'https://avatars2.githubusercontent.com/u/16469986', '', '2018-12-11 11:40:41', '2019-01-22 13:52:54', 0, 0, 1);
INSERT INTO `users` VALUES (2, 'ycy421', '', '', '2018-12-14 17:17:50', '2018-12-14 17:17:50', 1, 1, 1);
INSERT INTO `users` VALUES (3, 'ycycorona', '', '', '2018-12-14 17:18:02', '2018-12-19 22:00:30', 1, 1, 1);
INSERT INTO `users` VALUES (40, 'whh', '', 'grace', '2018-12-27 20:39:06', '2018-12-27 20:39:06', 0, 0, 1);

-- ----------------------------
-- Table structure for zmeta_users_roles
-- ----------------------------
DROP TABLE IF EXISTS `zmeta_users_roles`;
CREATE TABLE `zmeta_users_roles`  (
  `id` tinyint(3) NOT NULL,
  `user_role_text` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户类型英文名'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of zmeta_users_roles
-- ----------------------------
INSERT INTO `zmeta_users_roles` VALUES (0, 'super_admin');
INSERT INTO `zmeta_users_roles` VALUES (1, 'admin');
INSERT INTO `zmeta_users_roles` VALUES (10, 'user_1');

SET FOREIGN_KEY_CHECKS = 1;
