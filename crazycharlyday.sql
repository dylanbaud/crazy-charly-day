-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 13, 2025 at 01:52 PM
-- Server version: 10.11.6-MariaDB-0+deb12u1
-- PHP Version: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crazycharlyday`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `type` enum('customer','employee','administrator') NOT NULL,
  `valid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `email`, `last_name`, `first_name`, `tel`, `type`, `valid`) VALUES
(1, 'albert.morel@email.com', 'Morel', 'Albert', '+33 6 12 34 56 78', 'employee', 1),
(2, 'bertrand.lefevre@email.com', 'Lefevre', 'Bertrand', '+33 6 98 76 54 32', 'employee', 1),
(3, 'celine.dubois@email.com', 'Dubois', 'Celine', '+33 7 45 67 89 01', 'employee', 1),
(4, 'delphine.lambert@email.com', 'Lambert', 'Delphine', '+33 7 23 45 67 89', 'employee', 1),
(13, 'hugues.hugues@example.com', 'HuguesHugues', 'Hugues', '+33 6 02 25 47 81', 'customer', 1),
(14, 'Iris.iris@example.com', 'IrisIris', 'Iris', '+33 3 73 51 79 22', 'customer', 1),
(15, 'jacques.brel@example.fr', 'Brel', 'Jacques', '+33 6 02 44 86 03', 'customer', 1),
(16, 'albert.dagobert.example.fr', 'Dagobert', 'Albert', '+33 3 10 44 14 01', 'employee', 1),
(17, 'bertrand.zackyboy@example.com', 'ZackyBoy', 'Bertrand', '+33 7 70 40 74 11', 'employee', 1),
(18, 'celine.enilec@example.com', 'enilec', 'Celine', '+33 3 10 47 26 64 ', 'employee', 1),
(19, 'delphine.dauphin@exampledauphin.fr', 'Dauphin', 'Delphine', '+33 7 11 11 12 14', 'employee', 1);

-- --------------------------------------------------------

--
-- Table structure for table `need`
--

CREATE TABLE `need` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `need`
--

INSERT INTO `need` (`id`, `customer_id`, `description`, `skill_id`) VALUES
(1, 13, 'Jardinage', 2),
(2, 13, 'Bricolage', 1),
(3, 14, 'Jardinage', 2),
(4, 14, 'Bricolage', 1),
(5, 15, 'Bricolage', 1),
(6, 13, 'la 6ème d\'Antoine', 4),
(7, 1, 'bricolage', 1),
(8, 1, 'bricolage', 1),
(9, 1, 'bricolage', 1),
(10, 1, 'aze', 1),
(11, 1, 'bricolage', 1),
(12, 1, 'aze', 1),
(13, 1, 'a', 1),
(14, 1, 'ddd', 1),
(15, 2, 'Bonjour le besoin', 1),
(16, 1, 'bricolage', 1),
(17, 1, 'dzdaz', 1),
(18, 2, 'dsd', 1);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`id`, `title`, `description`) VALUES
(1, 'BR', 'Bricolage'),
(2, 'JD', 'Jardinage'),
(3, 'MN', 'Ménage'),
(4, 'IF', 'Informatique'),
(5, 'AD', 'Accompagnement dans les démarches administratives'),
(6, 'IN', 'Informatique'),
(7, 'AA', 'Entretien automobile'),
(13, 'A', 'Entretien automobile'),
(18, 'Add', 'Entretien automobile'),
(19, 'addqq', 'auytodada'),
(20, 'Aaadssd', 'Entretien automobile'),
(22, 'Aaadsqsd', 'Entretien automobile');

-- --------------------------------------------------------

--
-- Table structure for table `skill_interest`
--

CREATE TABLE `skill_interest` (
  `employee_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `interest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill_interest`
--

INSERT INTO `skill_interest` (`employee_id`, `skill_id`, `interest`) VALUES
(16, 1, 6),
(16, 2, 4),
(17, 1, 10),
(17, 2, 4),
(17, 3, 7),
(18, 1, 2),
(18, 2, 8),
(19, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `need_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `finish_date` date NOT NULL,
  `finished` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `tel` (`tel`);

--
-- Indexes for table `need`
--
ALTER TABLE `need`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_key` (`customer_id`),
  ADD KEY `skill_key` (`skill_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `skill_interest`
--
ALTER TABLE `skill_interest`
  ADD PRIMARY KEY (`employee_id`,`skill_id`),
  ADD KEY `skill_key2` (`skill_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `need_key` (`need_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `need`
--
ALTER TABLE `need`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `need`
--
ALTER TABLE `need`
  ADD CONSTRAINT `customer_key` FOREIGN KEY (`customer_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `skill_key` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `skill_interest`
--
ALTER TABLE `skill_interest`
  ADD CONSTRAINT `employee_key` FOREIGN KEY (`employee_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `skill_key2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `need_key` FOREIGN KEY (`need_id`) REFERENCES `need` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

