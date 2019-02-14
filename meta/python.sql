/*
 Navicat Premium Data Transfer

 Source Server         : aliyunecs
 Source Server Type    : MySQL
 Source Server Version : 50641
 Source Host           : 47.105.46.120:3306
 Source Schema         : python

 Target Server Type    : MySQL
 Target Server Version : 50641
 File Encoding         : 65001

 Date: 13/02/2019 09:43:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id`, `permission_id`) USING BTREE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id`, `codename`) USING BTREE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO `auth_permission` VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO `auth_permission` VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO `auth_permission` VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO `auth_permission` VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO `auth_permission` VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO `auth_permission` VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO `auth_permission` VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO `auth_permission` VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO `auth_permission` VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO `auth_permission` VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO `auth_permission` VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO `auth_permission` VALUES (13, 'Can add user', 4, 'add_user');
INSERT INTO `auth_permission` VALUES (14, 'Can change user', 4, 'change_user');
INSERT INTO `auth_permission` VALUES (15, 'Can delete user', 4, 'delete_user');
INSERT INTO `auth_permission` VALUES (16, 'Can view user', 4, 'view_user');
INSERT INTO `auth_permission` VALUES (17, 'Can add content type', 5, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (18, 'Can change content type', 5, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (19, 'Can delete content type', 5, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (20, 'Can view content type', 5, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (21, 'Can add session', 6, 'add_session');
INSERT INTO `auth_permission` VALUES (22, 'Can change session', 6, 'change_session');
INSERT INTO `auth_permission` VALUES (23, 'Can delete session', 6, 'delete_session');
INSERT INTO `auth_permission` VALUES (24, 'Can view session', 6, 'view_session');
INSERT INTO `auth_permission` VALUES (25, 'Can add question', 7, 'add_question');
INSERT INTO `auth_permission` VALUES (26, 'Can change question', 7, 'change_question');
INSERT INTO `auth_permission` VALUES (27, 'Can delete question', 7, 'delete_question');
INSERT INTO `auth_permission` VALUES (28, 'Can view question', 7, 'view_question');
INSERT INTO `auth_permission` VALUES (29, 'Can add choice', 8, 'add_choice');
INSERT INTO `auth_permission` VALUES (30, 'Can change choice', 8, 'change_choice');
INSERT INTO `auth_permission` VALUES (31, 'Can delete choice', 8, 'delete_choice');
INSERT INTO `auth_permission` VALUES (32, 'Can view choice', 8, 'view_choice');
INSERT INTO `auth_permission` VALUES (33, 'Can add production', 9, 'add_production');
INSERT INTO `auth_permission` VALUES (34, 'Can change production', 9, 'change_production');
INSERT INTO `auth_permission` VALUES (35, 'Can delete production', 9, 'delete_production');
INSERT INTO `auth_permission` VALUES (36, 'Can view production', 9, 'view_production');
INSERT INTO `auth_permission` VALUES (37, 'Can add production evaluation', 10, 'add_productionevaluation');
INSERT INTO `auth_permission` VALUES (38, 'Can change production evaluation', 10, 'change_productionevaluation');
INSERT INTO `auth_permission` VALUES (39, 'Can delete production evaluation', 10, 'delete_productionevaluation');
INSERT INTO `auth_permission` VALUES (40, 'Can view production evaluation', 10, 'view_productionevaluation');
INSERT INTO `auth_permission` VALUES (41, 'Can add review img', 11, 'add_reviewimg');
INSERT INTO `auth_permission` VALUES (42, 'Can change review img', 11, 'change_reviewimg');
INSERT INTO `auth_permission` VALUES (43, 'Can delete review img', 11, 'delete_reviewimg');
INSERT INTO `auth_permission` VALUES (44, 'Can view review img', 11, 'view_reviewimg');
INSERT INTO `auth_permission` VALUES (45, 'Can add actress', 12, 'add_actress');
INSERT INTO `auth_permission` VALUES (46, 'Can change actress', 12, 'change_actress');
INSERT INTO `auth_permission` VALUES (47, 'Can delete actress', 12, 'delete_actress');
INSERT INTO `auth_permission` VALUES (48, 'Can view actress', 12, 'view_actress');
INSERT INTO `auth_permission` VALUES (49, 'Can add production addons', 13, 'add_productionaddons');
INSERT INTO `auth_permission` VALUES (50, 'Can change production addons', 13, 'change_productionaddons');
INSERT INTO `auth_permission` VALUES (51, 'Can delete production addons', 13, 'delete_productionaddons');
INSERT INTO `auth_permission` VALUES (52, 'Can view production addons', 13, 'view_productionaddons');
INSERT INTO `auth_permission` VALUES (53, 'Can add actress comment', 14, 'add_actresscomment');
INSERT INTO `auth_permission` VALUES (54, 'Can change actress comment', 14, 'change_actresscomment');
INSERT INTO `auth_permission` VALUES (55, 'Can delete actress comment', 14, 'delete_actresscomment');
INSERT INTO `auth_permission` VALUES (56, 'Can view actress comment', 14, 'view_actresscomment');

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_login` datetime(6) NULL DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of auth_user
-- ----------------------------
INSERT INTO `auth_user` VALUES (1, 'pbkdf2_sha256$120000$UqZpNSWlWt0X$tcdd3orEclaGKIeXFHRXI4lqhtblCCXqkqL6p117N04=', '2018-11-21 14:43:39.144532', 1, 'admin', '', '', 'ycy421@gmail.com', 1, 1, '2018-11-21 06:56:59.880684');

-- ----------------------------
-- Table structure for auth_user_groups
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_user_groups_user_id_group_id_94350c0c_uniq`(`user_id`, `group_id`) USING BTREE,
  INDEX `auth_user_groups_group_id_97559544_fk_auth_group_id`(`group_id`) USING BTREE,
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for auth_user_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq`(`user_id`, `permission_id`) USING BTREE,
  INDEX `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for django_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `object_repr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL,
  `change_message` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co`(`content_type_id`) USING BTREE,
  INDEX `django_admin_log_user_id_c564eba6_fk_auth_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------
INSERT INTO `django_admin_log` VALUES (1, '2018-11-21 14:59:02.705708', '1', '很好', 1, '[{\"added\": {}}]', 8, 1);
INSERT INTO `django_admin_log` VALUES (2, '2018-11-22 03:46:40.384084', '1', '新村あかり', 1, '[{\"added\": {}}]', 12, 1);
INSERT INTO `django_admin_log` VALUES (3, '2018-11-22 03:49:42.405084', '1', 'ProductionEvaluation object (1)', 1, '[{\"added\": {}}]', 10, 1);
INSERT INTO `django_admin_log` VALUES (4, '2018-11-22 03:51:03.946084', '1', 'ProductionAddons object (1)', 1, '[{\"added\": {}}]', 13, 1);
INSERT INTO `django_admin_log` VALUES (5, '2018-11-22 03:51:36.646084', '1', '最狂イラマチオ秘書 喉奥御奉仕勤務', 1, '[{\"added\": {}}]', 9, 1);
INSERT INTO `django_admin_log` VALUES (6, '2018-11-22 03:52:56.744084', '1', 'ReviewImg object (1)', 1, '[{\"added\": {}}]', 11, 1);
INSERT INTO `django_admin_log` VALUES (7, '2018-11-22 03:53:12.401084', '2', 'ReviewImg object (2)', 1, '[{\"added\": {}}]', 11, 1);
INSERT INTO `django_admin_log` VALUES (8, '2018-11-22 06:22:50.318084', '1', 'ActressComment object (1)', 1, '[{\"added\": {}}]', 14, 1);

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label`, `model`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES (1, 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES (3, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (2, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (4, 'auth', 'user');
INSERT INTO `django_content_type` VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (12, 'irrumatio_lab', 'actress');
INSERT INTO `django_content_type` VALUES (14, 'irrumatio_lab', 'actresscomment');
INSERT INTO `django_content_type` VALUES (9, 'irrumatio_lab', 'production');
INSERT INTO `django_content_type` VALUES (13, 'irrumatio_lab', 'productionaddons');
INSERT INTO `django_content_type` VALUES (10, 'irrumatio_lab', 'productionevaluation');
INSERT INTO `django_content_type` VALUES (11, 'irrumatio_lab', 'reviewimg');
INSERT INTO `django_content_type` VALUES (8, 'polls', 'choice');
INSERT INTO `django_content_type` VALUES (7, 'polls', 'question');
INSERT INTO `django_content_type` VALUES (6, 'sessions', 'session');

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'contenttypes', '0001_initial', '2018-11-21 06:10:43.291684');
INSERT INTO `django_migrations` VALUES (2, 'auth', '0001_initial', '2018-11-21 06:10:44.415684');
INSERT INTO `django_migrations` VALUES (3, 'admin', '0001_initial', '2018-11-21 06:10:44.750684');
INSERT INTO `django_migrations` VALUES (4, 'admin', '0002_logentry_remove_auto_add', '2018-11-21 06:10:44.819684');
INSERT INTO `django_migrations` VALUES (5, 'admin', '0003_logentry_add_action_flag_choices', '2018-11-21 06:10:44.885684');
INSERT INTO `django_migrations` VALUES (6, 'contenttypes', '0002_remove_content_type_name', '2018-11-21 06:10:45.097684');
INSERT INTO `django_migrations` VALUES (7, 'auth', '0002_alter_permission_name_max_length', '2018-11-21 06:10:45.213684');
INSERT INTO `django_migrations` VALUES (8, 'auth', '0003_alter_user_email_max_length', '2018-11-21 06:10:45.330684');
INSERT INTO `django_migrations` VALUES (9, 'auth', '0004_alter_user_username_opts', '2018-11-21 06:10:45.421684');
INSERT INTO `django_migrations` VALUES (10, 'auth', '0005_alter_user_last_login_null', '2018-11-21 06:10:45.552684');
INSERT INTO `django_migrations` VALUES (11, 'auth', '0006_require_contenttypes_0002', '2018-11-21 06:10:45.611684');
INSERT INTO `django_migrations` VALUES (12, 'auth', '0007_alter_validators_add_error_messages', '2018-11-21 06:10:45.684684');
INSERT INTO `django_migrations` VALUES (13, 'auth', '0008_alter_user_username_max_length', '2018-11-21 06:10:45.802684');
INSERT INTO `django_migrations` VALUES (14, 'auth', '0009_alter_user_last_name_max_length', '2018-11-21 06:10:45.948684');
INSERT INTO `django_migrations` VALUES (15, 'sessions', '0001_initial', '2018-11-21 06:10:46.092684');
INSERT INTO `django_migrations` VALUES (16, 'polls', '0001_initial', '2018-11-21 06:41:13.507684');
INSERT INTO `django_migrations` VALUES (17, 'irrumatio_lab', '0001_initial', '2018-11-22 03:41:07.182084');
INSERT INTO `django_migrations` VALUES (18, 'irrumatio_lab', '0002_auto_20181122_1340', '2018-11-22 05:40:50.904084');
INSERT INTO `django_migrations` VALUES (19, 'irrumatio_lab', '0003_auto_20181122_1342', '2018-11-22 05:42:38.164084');
INSERT INTO `django_migrations` VALUES (20, 'irrumatio_lab', '0004_actresscomment', '2018-11-22 06:20:45.767084');
INSERT INTO `django_migrations` VALUES (21, 'irrumatio_lab', '0005_auto_20181122_1423', '2018-11-22 06:23:26.110084');

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session`  (
  `session_key` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`) USING BTREE,
  INDEX `django_session_expire_date_a5c62663`(`expire_date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of django_session
-- ----------------------------
INSERT INTO `django_session` VALUES ('3m69hg7lw1ow8w3sy9xwyj3gsms79lzu', 'YTg1ZDFiZmZiNmQyOGMxNzE1OGViZmU3ODEzOTJiMGI4MzA0ZTQ2Njp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5MzA2OWIzMGFkY2VhZjFmYmQ5NDE5YTJkM2RlZjFiNjI2ZWRiNjY5In0=', '2018-12-05 14:43:39.192652');
INSERT INTO `django_session` VALUES ('n0x6kg7ru7kq50giuuhmxyvrp75lbcxu', 'YTg1ZDFiZmZiNmQyOGMxNzE1OGViZmU3ODEzOTJiMGI4MzA0ZTQ2Njp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5MzA2OWIzMGFkY2VhZjFmYmQ5NDE5YTJkM2RlZjFiNjI2ZWRiNjY5In0=', '2018-12-05 07:00:23.243684');

-- ----------------------------
-- Table structure for irrumatio_lab_actress
-- ----------------------------
DROP TABLE IF EXISTS `irrumatio_lab_actress`;
CREATE TABLE `irrumatio_lab_actress`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actress_bid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `actress_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of irrumatio_lab_actress
-- ----------------------------
INSERT INTO `irrumatio_lab_actress` VALUES (1, 'niimura_akari', '新村あかり');

-- ----------------------------
-- Table structure for irrumatio_lab_production
-- ----------------------------
DROP TABLE IF EXISTS `irrumatio_lab_production`;
CREATE TABLE `irrumatio_lab_production`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `production_bid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `production_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pub_date` date NULL DEFAULT NULL,
  `official_review` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `lab_review` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `production_addons_id` int(11) NOT NULL,
  `production_evaluation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `production_addons_id`(`production_addons_id`) USING BTREE,
  UNIQUE INDEX `production_evaluation_id`(`production_evaluation_id`) USING BTREE,
  CONSTRAINT `irrumatio_lab_produc_production_addons_id_b28e2a79_fk_irrumatio` FOREIGN KEY (`production_addons_id`) REFERENCES `irrumatio_lab_productionaddons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `irrumatio_lab_produc_production_evaluatio_3a0d4b14_fk_irrumatio` FOREIGN KEY (`production_evaluation_id`) REFERENCES `irrumatio_lab_productionevaluation` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of irrumatio_lab_production
-- ----------------------------
INSERT INTO `irrumatio_lab_production` VALUES (1, 'mism-108', '最狂イラマチオ秘書 喉奥御奉仕勤務', '2018-09-25', '神映像連発！強制口姦フリークの皆様、今回も凄い作品が出来上がりました。巷のヌルいイラマチオを一蹴する正真正銘ガチイラマ、エヅきまくりの連続嘔吐。究極喉姦をコンセプトにこだわり抜いた渾身の自信作です。', '<h3>イラマチオ レビュー</h3> \r\n<h4>ハードイラマの最高傑作。美人秘書が獣のえずき声で胃液を吐きまくる。</h4>\r\n<p>メガネ姿の社長秘書「<a href=\"https://irm.avlabo.com/archives/niimura_akari.php\">新村あかり</a>」。社長のおもちゃと化した、やばいレベルの喉奥イラマが延々続く。</p>\r\n<h5>1. 社長室で奉仕イラマ</h5>\r\n<p>社長が帰るなり、えずき汁を受けるための桶を抱え、口をあんぐり開けてイラマチオ開始。最初からギン起ち巨根を喉奥まで挿入。序盤は喉奥で止めた状態で、涙を流しながらウゴウゴえずくリアクションを楽しむ。徐々に容赦ないピストンになり、えずき汁・胃液を吐きながらのガチイラマ。</p>\r\n<p>  途中から両手を吊り拘束。高速で頭を振りまくるハードピストンに、獣のようなえずき声をあげる。その後は体勢を変えながら、逆さイラマでは顔面ドロドロに。</p>\r\n<p>最後は仁王立ちで、高速ピストンの喉奥発射。直後にお掃除イラマが始まると、ここでまさかの喉奥放尿。そのまま口内に向けて放物線を描くおしっこが美しい。</p>\r\n<h5>2. 喉奥いたぶり</h5>\r\n<p>社長椅子に両手両足を拘束され、マンコにバイブをぶっ込まれたまま、開口具で開かれた喉奥を指でいじり倒し、細ディルド、バイブで胃液・水ゲロを吐かせまくる。</p>\r\n<p>ベッドに移動して男根でのイラマチオ。仰向けイラマ、土下座イラマで鼻水出しまくり、逆さイラマで顔面ドロドロにしたら、69での突き上げイラマで喉奥発射。</p>\r\n<h5>3. 2本の男根で喉奥発射</h5>\r\n<p>両手を拘束され、2男優に、逆さイラマ、マウントで喉奥をガン突きされ、鼻水出しながら涙を流してエズキまくる。もちろん2発とも喉奥発射。</p>\r\n<h5>4. 社員たちによる連続喉奥発射</h5>\r\n<p>オフィスで、社員達による喉姦。後ろで両腕をガッチリ拘束されたまま、連続での喉イラマ。赤面させながらの喉ピストンに、えずき汁・胃液を吐きながら、喉奥発射5連発。</p>\r\n<h5>5. 仕上げのハードイラマSEX</h5>\r\n<p>栓付き開口具に、指イラマで喉いじり。涙とえずき汁を流した後、2男優による、ハードなイラマSEXが始まる。超高速な喉奥ピストンでゲロを吐きながら、中途半端になりがちな３Pも豪快に展開される。串刺しファックのまましっかり喉奥発射しており、2男優とも複数回の喉奥連射が見られる。</p>\r\n<h5>総評</h5>\r\n<p>★10を超えている。と言わざるを得ない、完成度の高い作品。赤面しながら、吐いても止めない容赦ない喉奥イラマが延々続く。</p>\r\n<p>「新村あかり」の秘書役もしっくり。ドロドロになったイラマ顔も、ブサイクにならず美しい上に、獣のようなえずき声とエズキ反応も素晴らしい。全てではないが、男根の取り揃えも良く、発射もほぼ全て喉奥発射。精子はほとんど直飲み。</p>\r\n<p>制作に関わった全ての方に感謝を伝えたくなる。そんなイラマ好きのための作品です。</p>', 1, 1);

-- ----------------------------
-- Table structure for irrumatio_lab_production_actresses
-- ----------------------------
DROP TABLE IF EXISTS `irrumatio_lab_production_actresses`;
CREATE TABLE `irrumatio_lab_production_actresses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `production_id` int(11) NOT NULL,
  `actress_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `irrumatio_lab_production_production_id_actress_id_1d98934e_uniq`(`production_id`, `actress_id`) USING BTREE,
  INDEX `irrumatio_lab_produc_actress_id_9bbc2f6f_fk_irrumatio`(`actress_id`) USING BTREE,
  CONSTRAINT `irrumatio_lab_produc_actress_id_9bbc2f6f_fk_irrumatio` FOREIGN KEY (`actress_id`) REFERENCES `irrumatio_lab_actress` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `irrumatio_lab_produc_production_id_87be074c_fk_irrumatio` FOREIGN KEY (`production_id`) REFERENCES `irrumatio_lab_production` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of irrumatio_lab_production_actresses
-- ----------------------------
INSERT INTO `irrumatio_lab_production_actresses` VALUES (1, 1, 1);

-- ----------------------------
-- Table structure for irrumatio_lab_productionaddons
-- ----------------------------
DROP TABLE IF EXISTS `irrumatio_lab_productionaddons`;
CREATE TABLE `irrumatio_lab_productionaddons`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cover_img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dmm_link` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of irrumatio_lab_productionaddons
-- ----------------------------
INSERT INTO `irrumatio_lab_productionaddons` VALUES (1, 'https://pics.dmm.co.jp/mono/movie/mism108/mism108ps.jpg', 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=mism00108/oj9gdxs9-001');

-- ----------------------------
-- Table structure for irrumatio_lab_productionevaluation
-- ----------------------------
DROP TABLE IF EXISTS `irrumatio_lab_productionevaluation`;
CREATE TABLE `irrumatio_lab_productionevaluation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `irrumatio_times` int(11) NULL DEFAULT NULL,
  `irrumatio_cum_times` int(11) NULL DEFAULT NULL,
  `irrumatio_throat_cum_times` int(11) NULL DEFAULT NULL,
  `irrumatio_duration_min` int(11) NULL DEFAULT NULL,
  `spit_amount` smallint(6) NULL DEFAULT NULL,
  `spit_sound` smallint(6) NULL DEFAULT NULL,
  `puke_reaction` smallint(6) NULL DEFAULT NULL,
  `speed` smallint(6) NULL DEFAULT NULL,
  `depth` smallint(6) NULL DEFAULT NULL,
  `cock_level` smallint(6) NULL DEFAULT NULL,
  `puke_amount` smallint(6) NULL DEFAULT NULL,
  `actress_mark` smallint(6) NULL DEFAULT NULL,
  `overall_mark` smallint(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of irrumatio_lab_productionevaluation
-- ----------------------------
INSERT INTO `irrumatio_lab_productionevaluation` VALUES (1, 12, 18, 17, 118, 5, 5, 5, 5, 5, 5, 4, 0, 0);

-- ----------------------------
-- Table structure for irrumatio_lab_reviewimg
-- ----------------------------
DROP TABLE IF EXISTS `irrumatio_lab_reviewimg`;
CREATE TABLE `irrumatio_lab_reviewimg`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `review_img_link` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `production_addons_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `irrumatio_lab_review_production_addons_id_d5cfc3e7_fk_irrumatio`(`production_addons_id`) USING BTREE,
  CONSTRAINT `irrumatio_lab_review_production_addons_id_d5cfc3e7_fk_irrumatio` FOREIGN KEY (`production_addons_id`) REFERENCES `irrumatio_lab_productionaddons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of irrumatio_lab_reviewimg
-- ----------------------------
INSERT INTO `irrumatio_lab_reviewimg` VALUES (1, '/image/face/mkolabo/mism108/01.jpg', 1);
INSERT INTO `irrumatio_lab_reviewimg` VALUES (2, '/image/face/mkolabo/mism108/02.jpg', 1);

-- ----------------------------
-- Table structure for polls_choice
-- ----------------------------
DROP TABLE IF EXISTS `polls_choice`;
CREATE TABLE `polls_choice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `choice_text` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `votes` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `polls_choice_question_id_c5b4b260_fk_polls_question_id`(`question_id`) USING BTREE,
  CONSTRAINT `polls_choice_question_id_c5b4b260_fk_polls_question_id` FOREIGN KEY (`question_id`) REFERENCES `polls_question` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of polls_choice
-- ----------------------------
INSERT INTO `polls_choice` VALUES (1, '很好', 1, 1);

-- ----------------------------
-- Table structure for polls_question
-- ----------------------------
DROP TABLE IF EXISTS `polls_question`;
CREATE TABLE `polls_question`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pub_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of polls_question
-- ----------------------------
INSERT INTO `polls_question` VALUES (1, 'What\'s new?', '2018-11-21 06:45:26.485684');
INSERT INTO `polls_question` VALUES (2, '明天吃啥', '2018-11-21 17:51:00.000000');

SET FOREIGN_KEY_CHECKS = 1;
