-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2023 at 09:56 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medfluffy`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `img_url` text NOT NULL,
  `size_kb` int(11) NOT NULL DEFAULT 0,
  `extension_file` varchar(255) NOT NULL DEFAULT 'unknown',
  `description` varchar(255) NOT NULL DEFAULT 'unknown',
  `status` enum('uploaded','predicted','unknown') NOT NULL DEFAULT 'uploaded',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `img_url`, `size_kb`, `extension_file`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'unknown', 0, 'unknown', 'unknown', 'unknown', '2023-06-07 11:04:12', '2023-06-07 11:04:12'),
(2, 'a', 1, 'png', 'unknown', 'uploaded', '2023-06-07 17:31:44', '2023-06-07 17:31:44'),
(3, 'b', 2, 'png', 'unknown', 'uploaded', '2023-06-09 11:18:15', '2023-06-09 11:18:15');

-- --------------------------------------------------------

--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL DEFAULT 0,
  `id_img` int(11) NOT NULL DEFAULT 1,
  `id_result` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `predictions`
--

INSERT INTO `predictions` (`id`, `id_user`, `id_img`, `id_result`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, '2023-06-07 11:04:47', '2023-06-07 11:04:47'),
(2, 0, 2, 2, '2023-06-07 17:54:28', '2023-06-07 17:54:28'),
(3, 0, 3, 2, '2023-06-09 11:37:22', '2023-06-09 11:37:22');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `id_img` int(11) NOT NULL DEFAULT 1,
  `result_name` varchar(255) NOT NULL DEFAULT 'unknown',
  `accuration` int(11) NOT NULL DEFAULT 0,
  `description` varchar(255) NOT NULL DEFAULT 'unknown',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `id_img`, `result_name`, `accuration`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'unknown', 0, 'unknown', '2023-06-07 11:04:31', '2023-06-07 11:04:31'),
(2, 2, 'result1', 60, 'ini result test tambah input 1', '2023-06-07 17:45:53', '2023-06-07 17:45:53'),
(3, 3, 'result2', 62, 'ini result test tambah input 2', '2023-06-09 11:25:32', '2023-06-09 11:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230607084311-create-images.js'),
('20230607084335-create-results.js'),
('20230607084508-create-predictions.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_img` (`id_img`),
  ADD KEY `id_result` (`id_result`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_img` (`id_img`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `predictions`
--
ALTER TABLE `predictions`
  ADD CONSTRAINT `predictions_ibfk_1` FOREIGN KEY (`id_img`) REFERENCES `images` (`id`),
  ADD CONSTRAINT `predictions_ibfk_2` FOREIGN KEY (`id_result`) REFERENCES `results` (`id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`id_img`) REFERENCES `images` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
