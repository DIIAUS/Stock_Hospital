-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 10, 2022 at 04:32 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `loan_Item`
--

CREATE TABLE `loan_Item` (
  `idx` int(11) NOT NULL,
  `KurupanNumber` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `LoanDate` date NOT NULL,
  `DepartmentID` int(11) NOT NULL,
  `Status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loan_Item`
--

INSERT INTO `loan_Item` (`idx`, `KurupanNumber`, `Name`, `LoanDate`, `DepartmentID`, `Status`) VALUES
(17, '1212121/434', 'dfdf', '2022-06-09', 324, 1),
(3, '223', '2323', '2022-06-28', 3232, 32323);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loan_Item`
--
ALTER TABLE `loan_Item`
  ADD PRIMARY KEY (`KurupanNumber`),
  ADD KEY `idx` (`idx`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loan_Item`
--
ALTER TABLE `loan_Item`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
