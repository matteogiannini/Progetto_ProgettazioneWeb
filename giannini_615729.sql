-- Progettazione Web 
DROP DATABASE if exists giannini_615729; 
CREATE DATABASE giannini_615729; 
USE giannini_615729; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: giannini_615729
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partite`
--

DROP TABLE IF EXISTS `partite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partite` (
  `gameid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `timestamp` varchar(25) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`gameid`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partite`
--

LOCK TABLES `partite` WRITE;
/*!40000 ALTER TABLE `partite` DISABLE KEYS */;
INSERT INTO `partite` VALUES (1,21,2530,93,'2023-06-30 11:34:50',2),(2,21,30,13,'2023-06-30 12:58:59',1),(3,21,0,10,'2023-06-30 12:59:20',1),(4,28,90,13,'2023-06-30 22:21:01',1),(5,21,30,16,'2023-07-02 16:34:58',1),(6,21,180,22,'2023-07-04 18:45:08',1),(7,21,590,47,'2023-07-04 18:45:31',1),(8,29,870,55,'2023-07-05 17:42:47',1),(9,29,970,54,'2023-07-05 17:44:14',1),(10,29,820,47,'2023-07-05 17:45:09',1),(11,29,2090,108,'2023-07-05 17:46:47',2),(12,29,740,38,'2023-07-05 17:47:17',1),(13,29,2290,106,'2023-07-05 17:48:43',2),(14,29,890,51,'2023-07-05 18:27:18',1),(15,29,8700,395,'2023-07-05 18:30:42',4),(16,21,890,58,'2023-07-06 16:59:34',1),(17,21,4290,192,'2023-07-06 17:10:52',3),(18,21,0,131,'2023-07-06 17:41:10',1),(19,21,640,39,'2023-07-06 17:46:23',1),(20,21,2470,118,'2023-07-06 17:54:26',2),(21,21,3840,220,'2023-07-06 17:56:43',3),(22,21,2330,123,'2023-07-06 18:01:16',2),(23,21,3420,88,'2023-07-07 14:46:32',3),(24,21,14400,172,'2023-07-07 14:53:29',5),(25,21,540,28,'2023-07-09 12:48:20',1),(26,21,990,39,'2023-07-09 13:05:11',1),(27,21,690,31,'2023-07-09 13:12:50',1),(28,21,2010,54,'2023-07-10 15:20:25',2),(29,21,10,9,'2023-07-10 15:21:09',1),(30,21,0,7,'2023-07-10 15:21:20',1),(31,21,10,7,'2023-07-10 15:21:38',1),(32,21,9780,147,'2023-07-10 18:13:04',4),(33,21,110,10,'2023-07-10 18:27:36',1),(34,21,0,7,'2023-07-10 18:36:14',1),(35,21,0,16,'2023-07-10 18:36:53',1),(36,21,1810,46,'2023-07-11 17:55:56',2),(37,21,14750,176,'2023-07-11 17:59:13',5),(38,21,8620,142,'2023-07-12 14:37:31',4),(39,21,13900,166,'2023-07-12 14:42:33',5),(40,21,990,40,'2023-07-12 15:18:24',1),(41,21,380,26,'2023-07-12 15:27:30',1),(42,21,12450,153,'2023-07-13 10:54:56',5),(43,21,750,37,'2023-07-16 15:36:38',1),(44,21,390,23,'2023-07-16 16:07:29',1),(45,21,9380,141,'2023-07-16 16:12:13',4),(46,21,10,7,'2023-07-16 16:13:38',1),(47,32,1070,36,'2023-07-16 22:27:26',2);
/*!40000 ALTER TABLE `partite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (14,'mtt.giannini01@gmail.com','mttgiannini','$2y$10$rU.uMYaHCPvD5BNWJAyxpu8h66e3vA1F6594wJ16n2v9xGRHj1Mj.'),(15,'mtt.giannini01@hotmail.com','mttgiannini01','$2y$10$6JxNwDZknh2q0O/ifezWd.e7ZpvMFnoJKo7g7niYmN8HP0o1JIWjO'),(16,'mtt.giannini@gmeil.com','mttgiannini0101','$2y$10$2pM/VrnJte2JreYYc0gSTuv/J.mhbTIQzCcwCvaz/EzuJqWPzdFbC'),(17,'nicobache@gmail.com','nicobache11','$2y$10$czQzF3PV1oP2imWSJYwXUuy65RTh1sYc0mJzi5VIYjqdb4N0t531K'),(18,'nicobache1@gmail.com','nicobache111','$2y$10$KJv5FbVbukbRiPWXYi0Q5OduxNXWLvC5v/VK55/GoAeAPaxYmegtW'),(19,'nicobache11@gmail.com','nicobache1111','$2y$10$j0aVYkg2LOMVBGm6HJMtDud3nCGHJbdL3F6pGVWMnBLX0tdVdhOBm'),(20,'nicobache111@gmail.com','nicobache11111','$2y$10$zTEOb9bRplgLzsxxfo3eeuMuLoZL/ckWSLArBL5pqgbbDVo9UNycC'),(21,'m.giannini37@studenti.unipi.it','mtt.giannini01','$2y$10$hWrIVGtmL9j5bfE2npX2su6NSmPDEu/.ZZrTCZLOQf66JXCOsqh8W'),(22,'lol1234@gmail.com','Lol1234','$2y$10$b7O3WL04VvI9UQy7ShQQpOuUjgrzN7kJdv8MLLdkr42eqkMLhDQM.'),(23,'lala@gmail.com','lalalalalalalalalalalalalalalalalalalalala','$2y$10$q5SFUi.YWM7jGh.g5RyFP.5DLsfVBbCzegpm5JnUL47yvydeyET/S'),(24,'marti@gmail.com','marti','$2y$10$DAvLsib2DfqWsucxcSkJ1uvxBQCBPp15AEN3Zkxm028On7XQYFGRi'),(25,'lorenzo.menchini01@gmail.com','Abbecedario','$2y$10$L9/om06Mo6qXfjel3fTn8euh6NvubkH8wUS/hBDVdfSA00R0uedoq'),(26,'daniel@email.com','d.namaki1234','$2y$10$TJsMivO6Ls7UbQtpf/k2tuE0cySfAicHFzjp5UcY0B7zJjC4gDJ1a'),(27,'provala@gmail.com','provala','$2y$10$Pg9HGhuxc0ffzSD79MesQOetWtq60Vbah6Q3XvnUzmUHeoc/mcwrK'),(28,'prova@gmail.com','prova','$2y$10$WE/vIn4BecPgVNlUoLaaO.YNuJ9aTbWP0yX7Nj0//JZhaDnIjPu8O'),(29,'lol@gmail.com','mancio','$2y$10$DpquKEa4HtJzsUltwqVCeugHR/dCnqfCvuX6m3I/dD0iqH7idqCC2'),(30,'m.giannini37@studenti.unipi.com','matte2','$2y$10$oLiexIoqTXrKXgbi556D9.VExdOxA17lfag8aZz2NjD3N10D9M7FW'),(31,'mail@gmail.com','mtt.giannini0101','$2y$10$N1ZDvVfYL6eZ/Pj5/Am6J.Up5Irp1ZsR2alcC/dRiqh1/xi/oO3Na'),(32,'si01@gmail.com','SI01','$2y$10$jhzC6fnL8VJ6iuQZ.Qm77eh4bp8G1OX8SPsuRV9oJBaTfBAhF069e');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-16 22:28:48
