-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 21, 2022 at 09:03 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_contruction`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblBrands`
--

CREATE TABLE `tblBrands` (
  `brandId` int(11) NOT NULL,
  `brandName` varchar(200) NOT NULL,
  `desc` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblCategories`
--

CREATE TABLE `tblCategories` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(250) NOT NULL,
  `desc` varchar(250) NOT NULL,
  `photo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblCategories`
--

INSERT INTO `tblCategories` (`id`, `categoryName`, `desc`, `photo`) VALUES
(1, 'Juice', 'cambodia', 'images/1668951625284wallpaperflare.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblEmployees`
--

CREATE TABLE `tblEmployees` (
  `id` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblRoles`
--

CREATE TABLE `tblRoles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL,
  `desc` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblSupplies`
--

CREATE TABLE `tblSupplies` (
  `id` int(11) NOT NULL,
  `supName` varchar(250) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblBrands`
--
ALTER TABLE `tblBrands`
  ADD PRIMARY KEY (`brandId`);

--
-- Indexes for table `tblCategories`
--
ALTER TABLE `tblCategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblEmployees`
--
ALTER TABLE `tblEmployees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblRoles`
--
ALTER TABLE `tblRoles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `tblSupplies`
--
ALTER TABLE `tblSupplies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblBrands`
--
ALTER TABLE `tblBrands`
  MODIFY `brandId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblCategories`
--
ALTER TABLE `tblCategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblEmployees`
--
ALTER TABLE `tblEmployees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblRoles`
--
ALTER TABLE `tblRoles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblSupplies`
--
ALTER TABLE `tblSupplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
