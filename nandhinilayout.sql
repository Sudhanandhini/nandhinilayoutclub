-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 23, 2026 at 07:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nandhinilayout`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Super Admin', 'nandhini@gmail.com', '$2a$10$vE0K2HhQqugS8GGJQXqrVunlpPJAbM38WZLQtAdcxmd2mIKfub386', 'super_admin', '2026-05-28 07:26:46');

-- --------------------------------------------------------

--
-- Table structure for table `affiliated_clubs`
--

CREATE TABLE `affiliated_clubs` (
  `id` int(11) NOT NULL,
  `state` varchar(150) NOT NULL,
  `region` varchar(200) DEFAULT NULL,
  `club_name` varchar(300) NOT NULL,
  `location` varchar(300) DEFAULT NULL,
  `contact_info` varchar(300) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `affiliated_clubs`
--

INSERT INTO `affiliated_clubs` (`id`, `state`, `region`, `club_name`, `location`, `contact_info`, `email`, `notes`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'KARNATAKA', 'CHIKKAMAGALURU / KODAGU', 'COSMOPOLITIAN CLUB (R)', 'Taluk Office Road, Madikeri - 571201', 'Ph: 8762258529', 'cosmomdk@gmail.com', NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(2, 'KARNATAKA', 'CHIKKAMAGALURU / KODAGU', 'CHIKKABASAPPA CLUB', 'Somwarpet', 'Ph: 8276282145', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(3, 'KARNATAKA', 'CHIKKAMAGALURU / KODAGU', 'KHANDYA PLANTERS CLUB', 'Belase', 'Ph: 08262-252290 / 9483465290', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(4, 'KARNATAKA', 'CHIKKAMAGALURU / KODAGU', 'POINEERS TENNIS CLUB', 'Somwarpet', 'Ph: 08276-284500', NULL, NULL, 4, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(5, 'KARNATAKA', 'CHIKKAMAGALURU / KODAGU', 'WHISTLING WILLOWS CLUB', 'Kushalnagara', 'Contact: 8050238666', NULL, NULL, 5, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(6, 'KARNATAKA', 'CHITRADURGA', 'CITY INSTITUTE', 'Chitradurga', 'Ph: 9538653270', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(7, 'KARNATAKA', 'DAVANAGERE', 'OFFICERS CLUB', 'Davanagere', 'Ph: 08192-223520', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(8, 'KARNATAKA', 'DAVANAGERE', 'THE DAVANAGERE CLUB', 'Davanagere', 'Ph: 08192-250591 / 9844139488', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(9, 'KARNATAKA', 'GULBARGA / BIDAR / VIJAYAPUR', 'ASHODEV RESIDENCY CLUB', 'Bidar', 'Contact: 0876361888 / 9482545670', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(10, 'KARNATAKA', 'GULBARGA / BIDAR / VIJAYAPUR', 'GULBARGA CLUB', 'Gulbarga', 'Ph: 08472-262962 / 9980623484', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(11, 'KARNATAKA', 'GULBARGA / BIDAR / VIJAYAPUR', 'GULBARGA ENGINEERS FAMILY CLUB', 'Gulbarga', 'Ph: 9036668656', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(12, 'KARNATAKA', 'GULBARGA / BIDAR / VIJAYAPUR', 'SPOORTI CLUB', 'Vijayapur', 'Ph: 6362392878', NULL, NULL, 4, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(13, 'KARNATAKA', 'HASSAN', 'BELUR PLANTERS CLUB', 'Belur', 'Contact: 9535515161', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(14, 'KARNATAKA', 'HASSAN', 'CITY CLUB', 'Channrayapattana', 'Ph: 9343585717', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(15, 'KARNATAKA', 'HASSAN', 'COSMOPOLITAN SPORTS CLUB', 'Sakaleshpura', 'Ph: 08173-245227 / 8152044049', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(16, 'KARNATAKA', 'HASSAN', 'PAVANPUTRA SPORTS & CULTURAL CLUB', 'Hassan', 'Contact: 8296275700', NULL, NULL, 4, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(17, 'KARNATAKA', 'HASSAN', 'PEARLS CLUB', 'Kadur', 'Ph: 08267-214042', NULL, NULL, 5, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(18, 'KARNATAKA', 'HASSAN', 'PLANTERS CLUB', 'Hanbal', 'Ph: 08173-240923 / 7204793237', NULL, NULL, 6, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(19, 'KARNATAKA', 'HASSAN', 'PLANTERS CLUB', 'Arehally', 'Contact: 08177-21896 / 9964612993', NULL, NULL, 7, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(20, 'KARNATAKA', 'HASSAN', 'THE HASSAN CLUB', 'Hassan', 'Ph: 08172-268557', NULL, NULL, 8, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(21, 'KARNATAKA', 'HASSAN', 'THE HERITAGE', 'Hassan', 'Ph: 08172-257468 / 256810', NULL, NULL, 9, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(22, 'KARNATAKA', 'HASSAN', 'THE WOODS SPORTS CLUB', 'Sakaleshpura', 'Ph: 9844368443 / 984546666', NULL, NULL, 10, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(23, 'KARNATAKA', 'HUBLI-DHARWAD', 'COTTON COUNTRY & RESORTS', 'Hubli', 'Ph: 0836-2335799 / 9243264099', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(24, 'KARNATAKA', 'HUBLI-DHARWAD', 'HUBLI GYMKHANA CLUB', 'Hubli', 'Ph: 0836-2366685 / 2362798', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(25, 'KARNATAKA', 'MANDYA', 'MADDUR KREEDA BALAGA', 'Maddur', 'Ph: 8105015369', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(26, 'KARNATAKA', 'MANDYA', 'SPORTS CLUB', 'Mandya', 'Ph: 08232-225079', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(27, 'KARNATAKA', 'MYSORE', 'COSMOPOLITAN CLUB', 'Mysore', 'Contact: 0821-2422355 / 2423881', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(28, 'KARNATAKA', 'MYSORE', 'GELEYARA BALAGA R', 'Narasimharajapura', 'Ph: 08266-220225', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(29, 'KARNATAKA', 'MYSORE', 'POWER FRIENDS CLUB', 'Mysore', 'Ph: 8618820545 / 8950071715', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(30, 'KARNATAKA', 'MYSORE', 'SIDDARTHA SPORTS CLUB', 'Mysore', 'Ph: 0821-2471832 / 7942700890', NULL, NULL, 4, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(31, 'KARNATAKA', 'MYSORE', 'THE HERITAGE CLUB', 'Mysore', 'Contact: 0821-2412377 / 2974377', NULL, NULL, 5, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(32, 'KARNATAKA', 'MYSORE', 'VIJAYANAGARA SPORTS CLUB', 'Mysore', 'Ph: 0821-2514823 / 8971511032', NULL, NULL, 6, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(33, 'KARNATAKA', 'RAMANAGARA', 'TENE SPORTS & CULTURAL CLUB', 'Ramanagara', 'Ph: 9916774623 / 6361379391', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(34, 'KARNATAKA', 'SHIVAMOGGA', 'BHADRA SPORTS CLUB', 'Balehonnur', 'Contact: 9591844405', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(35, 'KARNATAKA', 'SHIVAMOGGA', 'COSMO CLUB', 'Shivamogga', 'Contact: 9448023477', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(36, 'KARNATAKA', 'SHIVAMOGGA', 'MALNAD CLUB', 'Thirthalli', 'Ph: 08181-820220 / 828220', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(37, 'KARNATAKA', 'SHIVAMOGGA', 'ROVERS CLUB (R)', 'Shivamogga', 'Ph: 08182-223938 / 695604', NULL, NULL, 4, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(38, 'KARNATAKA', 'SHIVAMOGGA', 'SHIMOGA CITY CLUB (R)', 'Shivamogga', 'Ph: 08182-222279', NULL, NULL, 5, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(39, 'KARNATAKA', 'SHIVAMOGGA', 'SHIMOGA COUNTRY CLUB', 'Shivamogga', 'Ph: 08182-475561 / 8088577619', NULL, NULL, 6, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(40, 'KARNATAKA', 'TUMKUR', 'COSMOPOLITAN CLUB', 'Tiptur', 'Ph: 08134-251140', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(41, 'KARNATAKA', 'TUMKUR', 'TUMKUR CLUB', 'Tumkur', 'Ph: 0816-2278366', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(42, 'KARNATAKA', 'UDUPI / MANGALORE', 'CLUB MERIDIAN', 'Kundapur', 'Ph: 7022636666', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(43, 'KARNATAKA', 'UDUPI / MANGALORE', 'THE PUTTUR CLUB', 'Puttur', 'Ph: 9448483717 / 7204783717', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(44, 'KARNATAKA', 'UDUPI / MANGALORE', 'VALLEY VIEW COUNTY CLUB', 'Udupi', 'Contact: 8861325186', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(45, 'KARNATAKA', 'UDUPI / MANGALORE', 'WEST IND COUNTRY CLUB', 'Manipal', 'Ph: 8722215473 / 9916290354', NULL, NULL, 4, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(46, 'ANDHRA PRADESH', NULL, 'THE ANANTPUR CLUB', 'Anantapuram', 'Ph: 08554-36374', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(47, 'ASSAM', NULL, 'CLUB TRANSCEND', 'Guwahati', 'Ph: 600011101', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(48, 'DELHI', NULL, 'EXECUTIVE CLUB', 'Delhi', 'Ph: 011-26654444 / 9582809515', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(49, 'DELHI', NULL, 'JANAKPURI CLUB', 'Delhi', 'Ph: 011-25505353 / 255052306', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(50, 'GOA', NULL, 'GHYMKHANA CLUB', 'Sirvoi, Goa', 'Ph: 9380132207', NULL, NULL, 1, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(51, 'GOA', NULL, 'NEWERA GOA GYMKHANA CLUB', 'South Goa', 'Ph: 483821479', NULL, NULL, 2, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(52, 'GOA', NULL, 'WOODBOURNE COUNTRY CLUB', 'Goa', 'Ph: 7385736704 / 8799907123', NULL, NULL, 3, 1, '2026-06-11 13:20:01', '2026-06-11 13:20:01'),
(53, 'GUJARAT', NULL, 'PIYUSH PALACE CLUB', 'Kheda', 'Ph: 9974028864 / 9727722082', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(54, 'GUJARAT', NULL, 'SAVVY SWARAAJ SPORTS CLUB', 'Ahmedabad', 'Ph: 07940395121 / 8980088855', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(55, 'GUJARAT', NULL, 'SUN CITY CLUB', 'Vadodara', 'Ph: 8141414567', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(56, 'GUJARAT', NULL, 'THE ORIENT CLUB', 'Ahmedabad', 'Ph: 9712445688', NULL, NULL, 4, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(57, 'HIMACHAL PRADESH', NULL, 'CHESTER HILLS CLUB', 'Solan', 'Ph: 9816034003', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(58, 'KERALA', NULL, 'COCHIN GYMKHANA', 'Cochin', 'Ph: 0484-4021217 / 2304148', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(59, 'KERALA', NULL, 'COSMO CLUB', 'Wayanad', 'Ph: 94472039', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(60, 'KERALA', NULL, 'ENGINEERS CLUB', 'Cochin', 'Ph: 0484-2808792 / 7561033201', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(61, 'KERALA', NULL, 'KOTHAMANGALAM CLUB', 'Ernakulam', 'Contact: 914852862001 / 7561033201', NULL, NULL, 4, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(62, 'KERALA', NULL, 'MADHAVARAJ CLUB', 'Palakkad', 'Ph: 0491-2522706 / 2525354', NULL, NULL, 5, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(63, 'KERALA', NULL, 'MANNAM MEMORIAL NATIONAL CLUB', 'Thiruvananthapuram', 'Ph: 0471-233811 / 2333599', NULL, NULL, 6, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(64, 'KERALA', NULL, 'PERIYAR CLUB', 'Ernakulam, Aluva', 'Ph: 0484-2606963 / 9400589963', NULL, NULL, 7, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(65, 'KERALA', NULL, 'RAMAVARAMA DISTRICT CLUB', 'Alappuzha', 'Contact: 0477-2251436 / 2238544', NULL, NULL, 8, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(66, 'KERALA', NULL, 'SRI MULAM CLUB', 'Thiruvananthapuram', 'Contact: 0471-2722980 / 2723008', NULL, NULL, 9, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(67, 'KERALA', NULL, 'THE ATTINGAL CLUB', 'Thiruvananthapuram', 'Ph: 9447085157', NULL, NULL, 10, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(68, 'KERALA', NULL, 'THE COSMOPOLITAN CLUB', 'Manjeri, Malappuram', 'Ph: 0483-2766843', NULL, NULL, 11, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(69, 'KERALA', NULL, 'THE MALABAR CLUB', 'Palakkad', 'Ph: 9847929277', NULL, NULL, 12, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(70, 'KERALA', NULL, 'TRICHUR TENNIS TRUST', 'Puzhakkal', 'Ph: 0487-2382036 / 994655889', NULL, NULL, 13, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(71, 'MAHARASHTRA', NULL, 'AURANGABAD GYMKHANA CLUB', 'Aurangabad', 'Ph: 0240-2489865 / 9783052306', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(72, 'MAHARASHTRA', NULL, 'DADAR CLUB', 'Dadar, Mumbai', 'Ph: 022-24154282 / 9930032973', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(73, 'MAHARASHTRA', NULL, 'DECCAN GYMKHANA', 'Pune', 'Ph: 022-25675994 / 9370077144', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(74, 'MAHARASHTRA', NULL, 'MALPANI CLUB', 'Sangamner', 'Ph: 9881246144', NULL, NULL, 4, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(75, 'MAHARASHTRA', NULL, 'MIA CENTRE FOR SPORTS & RECREATION', 'Nagpur', 'Ph: 07104-297181', NULL, NULL, 5, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(76, 'MAHARASHTRA', NULL, 'NASIKLUB', 'Nasik', 'Ph: 0253-2411254 / 7499157745', NULL, NULL, 6, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(77, 'MAHARASHTRA', NULL, 'THE BLUE ROOF CLUB', 'Thane', 'Ph: 8070655001', NULL, NULL, 7, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(78, 'PONDICHERRY', NULL, 'CERCLE DE PONDECHERRY', 'Pondicherry', 'Ph: 8190914023', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(79, 'RAJASTHAN', NULL, 'GOLDEN CITY CLUB', 'Jaisalmer', 'Ph: 9928128293 / 8696891200', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(80, 'RAJASTHAN', NULL, 'JAISAL CLUB', 'Jaisalmer', 'Ph: 02992-55555 / 9784311100', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(81, 'RAJASTHAN', NULL, 'JEY KRISHNA CLUB', 'Alwar', 'Ph: 9799997956', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(82, 'RAJASTHAN', NULL, 'JODHAPUR CLUB', 'Jodhpur', 'Ph: 91-291-261555', NULL, NULL, 4, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(83, 'RAJASTHAN', NULL, 'SADUL CLUB', 'Bikaner', 'Ph: 8000629865', NULL, NULL, 5, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(84, 'RAJASTHAN', NULL, 'THE CAMEL CLUB', 'Jaisalmer', 'Ph: 8003406847', NULL, NULL, 6, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(85, 'RAJASTHAN', NULL, 'UPACA CLUB', 'Abu Road', 'Ph: 022-28878000 / 321985139', NULL, NULL, 7, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(86, 'TAMILNADU', NULL, 'GUDALUR COSMPOLITAN CLUB', 'Nilgiris', 'Contact: 8903561842', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(87, 'TAMILNADU', NULL, 'MADURAI UNION CLUB', 'Madurai', 'Ph: 0452-2530105', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(88, 'TAMILNADU', NULL, 'NANI\'S NOOK', 'Nilgiris', 'Contact: 9886672582 / 888982582', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(89, 'TAMILNADU', NULL, 'THE KERALA CLUB', 'Coimbatore', 'Ph: 0422-2216231 / 2215178', NULL, NULL, 4, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(90, 'TAMILNADU', NULL, 'THE PRESIDENCY CLUB', 'Ooty', 'Ph: 0423-2452310 / 9698966843', NULL, NULL, 5, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(91, 'TAMILNADU', NULL, 'WINDSOR CLUB', 'Salem', 'Ph: 0427-4067600', NULL, NULL, 6, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(92, 'TELENGANA', NULL, 'CHIRAAN FORT CLUB', 'Hyderabad', 'Ph: 040-39841100 / 39841199', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(93, 'UTTAR PRADESH', NULL, 'AGRA CLUB', 'Agra', 'Ph: 9412261606', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(94, 'UTTAR PRADESH', NULL, 'CITY CLUB', 'Kanpur', 'Ph: 9336275136', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(95, 'UTTAR PRADESH', NULL, 'SHRINE CLUB', 'Vrindhavan', 'Ph: 07906281186', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(96, 'WEST BENGAL', NULL, 'THE CIRCLE CLUB', 'Kolkata', 'Ph: 9836789484', NULL, NULL, 1, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(97, 'WEST BENGAL', NULL, 'THE SPRING CLUB', 'Kolkata', 'Ph: 9836900125', NULL, NULL, 2, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02'),
(98, 'WEST BENGAL', NULL, 'THE SPACE CIRCLE', 'Kolkata', 'Ph: 8017220000', NULL, NULL, 3, 1, '2026-06-11 13:20:02', '2026-06-11 13:20:02');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `subtitle` varchar(300) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `link_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `subtitle`, `image_url`, `link_url`, `sort_order`, `is_active`, `created_at`) VALUES
(5, '', '', '/uploads/banners/1780118917190-749212964.jpg', '', 0, 1, '2026-05-30 05:28:37'),
(6, '', '', '/uploads/banners/1780118925166-180715452.jpg', '', 1, 1, '2026-05-30 05:28:45'),
(7, '', '', '/uploads/banners/1780118934389-552601947.jpg', '', 2, 1, '2026-05-30 05:28:54'),
(8, '', '', '/uploads/banners/1780118943092-588045145.jpg', '', 3, 1, '2026-05-30 05:29:03');

-- --------------------------------------------------------

--
-- Table structure for table `committee_members`
--

CREATE TABLE `committee_members` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `designation` varchar(200) DEFAULT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `committee_members`
--

INSERT INTO `committee_members` (`id`, `name`, `designation`, `photo_url`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test', '/uploads/committee/1790140193168-301490379.jpeg', 1, 1, '2026-09-23 05:09:53', '2026-09-23 05:09:53'),
(2, NULL, NULL, '/uploads/committee/1790140454587-162083135.jpeg', 2, 1, '2026-09-23 05:14:14', '2026-09-23 05:14:14');

-- --------------------------------------------------------

--
-- Table structure for table `contact_inquiries`
--

CREATE TABLE `contact_inquiries` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(300) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_inquiries`
--

INSERT INTO `contact_inquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `created_at`) VALUES
(1, 'Mahesh', 'support@sunsys.in', NULL, 'test', 'test', 'read', '2026-05-30 06:50:55'),
(2, 'Mahesh', 'maheshkumar.d.sunsys@gmail.com', NULL, 'test', 'testing1\n', 'unread', '2026-05-30 06:58:30'),
(3, 'Vaishak Kamath ', 'Kamathvaishak6@gmail.com', NULL, 'Regarding Memebership ', 'Kindly email me the requirements or Procedure to avail membership ', 'unread', '2026-07-05 13:28:39'),
(4, 'test', 'test@gmail.com', NULL, 'test', 'test', 'unread', '2026-07-08 10:17:41'),
(5, 'asha sandeep ', 'janukiran2424@gmail.com', NULL, 'membership', 'wanted detail details about membership', 'unread', '2026-07-22 13:08:58'),
(6, 'Karthik Deva M', 'karthikdev2009@gmail.com', NULL, 'Nandini Layout club membership ', 'I am interested in taking a new membership. What is the current admission fee and annual subscription? Is there a proposer/seconder requirement? Also, does the membership include swimming-pool access for family members?', 'unread', '2026-09-16 13:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `icon_url` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`id`, `name`, `description`, `icon_url`, `image_url`, `category`, `sort_order`, `is_active`, `created_at`) VALUES
(1, ' Basement', 'The basement has a wooden shuttle court. Club has Table Tennis, Chess, & Carom Facilities in the same floor. Billiards Lounge is being planned in the same floor.', '/uploads/icons/icon-sports.png', NULL, 'Sports', 1, NULL, '2026-05-28 07:26:46'),
(2, 'Ground Floor', 'Ground Floor has a front office and a beautiful & compact library. The collection of books in Kannada & English is about 2000 and the collection of DVDs is about 200. Some of the Members have donated good books to the library. The library has subscribed to many news papers and periodicals.', '/uploads/icons/icon-health.png', NULL, 'Wellness', 2, NULL, '2026-05-28 07:26:46'),
(9, 'Basement', 'The basement has a wooden shuttle court. Club has Table Tennis, Chess, & Carom Facilities in the same floor. Billiards Lounge is being planned in the same floor.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:03:05'),
(10, 'Ground Floor', 'Ground Floor has a front office and a beautiful & compact library. The collection of books in Kannada & English is about 2000 and the collection of DVDs is about 200. Some of the Members have donated good books to the library. The library has subscribed to many news papers and periodicals.', NULL, NULL, 'General', 2, NULL, '2026-05-28 10:03:51'),
(12, 'First Floor', 'First floor has an office, a Board Room and Air Conditioned Cards room. Cards room is open on all days during Evening and on Sundays, second Saturdays and public Holidays, it is opened in the afternoon also. Rummy Jackpot Tournament is conducted every year and card players from all over the State take part in the Event.', NULL, NULL, 'General', 0, NULL, '2026-05-28 10:04:27'),
(13, 'Ground Floor', 'Ground Floor has a front office and a beautiful & compact library. The collection of books in Kannada & English is about 2000 and the collection of DVDs is about 200. Some of the Members have donated good books to the library. The library has subscribed to many news papers and periodicals.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:05:11'),
(14, 'Mezzanine Floor', 'This floor has an air Conditioned mini party hall, which can accommodate about 30 people. The party hall has a serving room and a toilet. The tariff for this room is Rs. 1,000/-. Food and Liquor are served as per the order booked in advance.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:05:18'),
(15, 'First Floor', 'First floor has an office, a Board Room and Air Conditioned Cards room. Cards room is open on all days during Evening and on Sundays, second Saturdays and public Holidays, it is opened in the afternoon also. Rummy Jackpot Tournament is conducted every year and card players from all over the State take part in the Event.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:05:27'),
(16, 'Second Floor', 'Second Floor is considered to be a jewel in the crown with an air conditioned Family Restaurant, Non Air Conditioned Family Restaurant, Air Conditioned Men’s Bar and Air Conditioned Ultra-Mini Party hall for small get-togethers of about 10 people. Tariff for this AC ultra-mini Party Hall is Rs.250/-.\r\nSecond floor houses a state of the Art Kitchen with separate Veg and Non Veg Sections.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:05:40'),
(17, 'Third Floor', 'Third Floor has a Beautiful Party hall, which can accommodate about 250 people. It has a Dias and Public Address System. This hall is generally overbooked due to its low tariff of Rs.2,200/- and members book this hall for birthday functions, Get-togethers, engagement parties, Installation and Charternite programmes of lions Clubs and Rotary Clubs, Election Campaign Parties etc. This hall has a serving area and food & liquor can be served from this area.\r\n\r\nThis floor also has a non AC small party hall, which can accommodate about 15 people. Tariff for this room is Rs.250/-.\r\n\r\nAn Ultra Modern gym with treadmills, multi gym, elliptical cross trainer, recumbent bike, spin bike, dumbbells, bars and weight plates, abdominal bench, incline & flat bench, Dip Station, Aerobic Stepper, Squat Rack etc. There is a separate batch for ladies between 11AM 12 Noon. Members and their guests (in presence of members) enjoy this facility by paying a nominal fee of Rs.200/- per month (for guests). The Gym is open from 6 AM to 12 noon in the morning hours and 5 PM to 9 PM in the evening Hours.\r\n\r\nThe Club has an Ayurvedic Massage Centre and a steam Bath. Masseurs (separately for ladies and gents) can be booked with prior appointment.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:05:51'),
(18, 'Fourth Floor', 'This floor is popularly known as “roof Garden” and houses a non AC Bar and Restaurant. It has a projector with a big screen. All channels of Tata Sky have been subscribed to cater to their needs of broad spectrum of members. This floor can be booked during day time for parties at a tariff of Rs.5000/-. This floor can accommodate about 350 people for such parties.', NULL, NULL, 'General', 0, 1, '2026-05-28 10:06:05');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT 'General',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title`, `image_url`, `thumbnail_url`, `category`, `sort_order`, `is_active`, `created_at`) VALUES
(11, '', '/uploads/gallery/1780120379870-724652008.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:52:59'),
(12, '', '/uploads/gallery/1780120384061-925545545.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:04'),
(13, '', '/uploads/gallery/1780120389547-416979343.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:09'),
(14, '', '/uploads/gallery/1780120400147-357605441.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:20'),
(15, '', '/uploads/gallery/1780120404412-138965615.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:24'),
(16, '', '/uploads/gallery/1780120408443-550909276.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:28'),
(17, '', '/uploads/gallery/1780120413091-487956980.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:33'),
(18, '', '/uploads/gallery/1780120417995-953972342.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:37'),
(19, '', '/uploads/gallery/1780120426659-744603778.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:46'),
(20, '', '/uploads/gallery/1780120431747-444850830.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:51'),
(21, '', '/uploads/gallery/1780120438387-735885316.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:53:58'),
(22, '', '/uploads/gallery/1780120443369-508664287.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:03'),
(23, '', '/uploads/gallery/1780120451883-100663680.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:11'),
(24, '', '/uploads/gallery/1780120455924-536246308.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:15'),
(25, '', '/uploads/gallery/1780120462747-672459869.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:22'),
(26, '', '/uploads/gallery/1780120468235-289952211.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:28'),
(27, '', '/uploads/gallery/1780120473954-540970018.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:33'),
(28, '', '/uploads/gallery/1780120479123-736722885.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:39'),
(29, '', '/uploads/gallery/1780120484216-182101857.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:44'),
(30, '', '/uploads/gallery/1780120492667-186486571.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:52'),
(31, '', '/uploads/gallery/1780120497650-445948416.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:54:57'),
(32, '', '/uploads/gallery/1780120503272-549843528.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:55:03'),
(33, '', '/uploads/gallery/1780120507379-898697984.jpeg', NULL, 'General', 0, 1, '2026-05-30 05:55:07');

-- --------------------------------------------------------

--
-- Table structure for table `memberships`
--

CREATE TABLE `memberships` (
  `id` int(11) NOT NULL,
  `full_name` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `membership_type` enum('individual','family','corporate','senior') DEFAULT 'individual',
  `message` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news_events`
--

CREATE TABLE `news_events` (
  `id` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `content` longtext DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_events`
--

INSERT INTO `news_events` (`id`, `title`, `content`, `image_url`, `event_date`, `is_featured`, `is_active`, `created_at`) VALUES
(3, 'Grand Gala New Year Bassh', '', '/uploads/news/1780120776292-173689398.jpg', '0000-00-00', 0, NULL, '2026-05-28 07:26:47'),
(5, 'Grand New Year Gala', '', '/uploads/news/1780120806003-233424061.jpg', '0000-00-00', 0, 1, '2026-05-30 06:00:06');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `title` varchar(300) NOT NULL,
  `content` longtext DEFAULT NULL,
  `meta_title` varchar(300) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `title`, `content`, `meta_title`, `meta_description`, `featured_image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'about-club', 'About Club', '<p>Nandini Layout Club - The perfect place to enjoy life in a classy and friendly atmosphere! The Club houses a unique combination of the traditions of an exclusive club and the best of today\'s sporting, leisure, entertaining and hotel facilities, in one of the most convenient locations in West Bangalore.</p>\r\n\r\n<p>From its humble beginning as “Chord Road Club” in 1986, when it was started in a small car shed to a modern multi-storied, private “Nandini Layout Club” in 2015 – Our Club has seen and undergone a plethora of ups & downs; and has now emerged as a ‘dream-come-true’ for every single member who has dedicated his/her precious time, resource and patience in honing and nurturing this legacy of hard-work and tradition.</p>\r\n\r\n<p>The Nandini Layout Club celebrated its Silver Jubilee with pride and fond memories, and being located in close proximity to the world-famous ISKCON temple; Nandini Layout Club is also set on the path to becoming a Golden landmark in the history of West Bangalore!</p>\r\n\r\n<p>Our much-loved Club offers its members some of the best-in-class facilities that are on par with some of the leading Clubs in Central Bangalore – We take this opportunity to invite you to visit our Club and experience, first-hand, why we, as members, are so much in awe of this fraternity.</p>\r\n\r\n<p>For those seeking an incredible venue in which to entertain, we offer beautiful function rooms that are perfect for private and corporate use. The air conditioned mini party hall, which accommodates 10-15 people, is perfect for cosy, personal family celebrations.</p>\r\n\r\n<p>Whether a family get-together, a special party with close friends, or even an engagement or wedding reception - Nandini Layout Club offers something for every occasion and this makes every event a special celebration.</p>\r\n\r\n<p>Nandini Layout Club houses some of the finest sporting and leisure facilities like our ultra-modern gym that allow you to work up a sweat and leave you refreshed for another busy day. The air conditioned card rooms facilitate complete privacy and hours of enjoyment – don’t miss the chance of participating in our famous State Level Rummy Jackpot Tournaments that are organised regularly!</p>\r\n\r\n<p>Spacious changing rooms and absolute privacy allow you to rejuvenate your mind, body and senses in our exclusive Ayurvedic massage, steam room & spa and feel refreshed and ready for the competitive world outside.</p>\r\n\r\n<p>Nandini Layout Club has a full-fledged badminton court, table-tennis area & Carom table where you can hone your skills and keep yourself fit for the sports competitions and events that are organised here regularly. A full-fledged billiards & pool lounge is also being planned at our club that is guaranteed to let unwind and relax after a long tiring day in the hub-bub of the city’s traffic.</p>\r\n\r\n<p>They say that if “a celebration is worth it then it should be celebrated in style” – and this is exactly what our third-floor party hall offers its members. The beautifully designed, air-conditioned hall accommodates up to 200 people. Complete with a public address system and a podium, this hall gives your events a special feel – a prefect setting for intimate parties and celebrations.</p>\r\n\r\n<p>Bangalore is called the Garden City for a reason and this fact comes alive in absolute splendour and panache when you step in to the Nandini Layout Club garden-roof bar and restaurant. This open air haven lets you enjoy nature in all her glory. Our Club is surrounded by almost forest-like greenery and a fabulously maintained garden that encircles the Club in its beauty and rainbow-coloured flower beds – this is the kind of natural beauty you would expect to find only in expensive resort getaways; but one visit to our beloved Nandini Layout Club will leave you wanting for more and you don’t even have to pack your bags! This is the kind of retreat that will help you relax and unwind completely. Enjoy your drink in the company of good friends and colleagues or just occupy a table facing the lush gardens and let go of your worries in the company of chirruping birds and Mother Nature!</p>\r\n\r\n<p>We strongly believe that no club is complete without a well maintained library – and that is exactly what we have in our beloved Nandini Layout Club, a compact library that caters to everyone’s needs; be it a 6 year old child who wants to enjoy a comic book or a 60 year old who wants to contemplate on the meaning of life – we have books that will enhance your knowledge of the world and beyond!</p>\r\n\r\n<p>We pride ourselves on our extremely high standards of service here and our aim is to create the most memorable days of your life – with this aim in mind we regularly organise sports and card tournaments that help us enjoy our time with friends and build the spirit of camaraderie as well.</p>\r\n\r\n<p>The vision and dream that our erstwhile founding members had, has now been realized, and now we are on the threshold of a new dream – “To transform Nandini Layout Club into a private haven where our members can meet, greet and socialize and help build a stronger society based on traditions and values.” – So we strive each day to bring something new - something fresh - to your experience.</p>', 'About Nandini Layout Club | West Bangalore\'s Premier Club', 'Learn about Nandini Layout Club - West Bangalore\'s premier social club established in 1986 with world-class amenities.', NULL, 1, '2026-05-28 07:26:46', '2026-05-28 08:56:17'),
(2, 'presidents-message', 'President\'s Message', '<p>Dear Members,<br>\r\n<p>It gives me immense pleasure in addressing you as President during the Silver Jubilee Year. I thank you\r\nall for giving me this rare and most sought after opportunity.</p>\r\n\r\n<p>I am proud to mention that our long cherished dream of having AC and Non AC Family Restaurants and Men\'s Bar is now a reality, thanks to the dedicated and hardworking managing Council Members,who have toiled for 2years to accomplish the same.</p>\r\n\r\n<p>We could obtain approval from various Government Authorities to change the name of the Club to NANDINI LAYOUT CLUB,as aspired by our members.</p>\r\n\r\n<p>With the unconditional support from the members, the great Club built over 25 years by our selfless predecessors,has achieved premium status amoungst prestigious clubs in bangalore.</p>\r\n<br>\r\n<p>With warm regards,</p>\r\n<p>Sri Dinesh Kumar K S </p>\r\n<p>President</p>', 'President\'s Message | Nandini Layout Club', 'Message from the President of Nandini Layout Club.', NULL, 1, '2026-05-28 07:26:46', '2026-05-28 08:58:12'),
(3, 'secretarys-message', 'Hon. Secretary\'s Message', '<p>ಗೌರವಾನ್ವಿತ ಸದಸ್ಯರುಗಳೇ,</p>\r\n\r\n<p>ಕ್ಲಬ್ಬಿನ ಗೌ.ಕಾರ್ಯದರ್ಶಿಯ ಹುದ್ದೆಗೆ ನನ್ನನ್ನು ಆರಿಸಿರುವ ತಮ್ಮೆಲ್ಲರಿಗೂ ಪ್ರಥಮವಾಗಿ ವಂದಿಸುತ್ತೇನೆ. ಗೌ.ಕಾರ್ಯದರ್ಶಿಯ ಹುದ್ದೆ ಅತ್ಯಂತ ಗುರುತರವಾದ ಕಾರ್ಯವ್ಯಾಪ್ತಿಯನ್ನು ಹೊಂದಿರುವಂತಹದ್ದು, ಗೆದ್ದ ಹುಮ್ಮಸ್ಸಿನಲ್ಲಿ ಎಲ್ಲ ಪದಾಧಿಕಾರಿಗಳ, ಆಡಳಿತಮಂಡಳಿಯ ಸದಸ್ಯರುಗಳ ವಿಶ್ವಾಸದೊಂದಿಗೆ ಕ್ಲಬ್ ನ್ನು ಪ್ರಗತಿಯೆಡೆಗೆ ಕೊಂಡೊಯ್ಯುವತ್ತ ಒಂದೊಂದೆ ಹೆಜ್ಜೆಯನ್ನು ಇಡುತ್ತಾ ಮುಂದೆ ಸಾಗುತ್ತಿದ್ದೇವೆ, ಪ್ರಮುಖವಾಗಿ ಕ್ಲಬ್ಬಿನ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಉತ್ತಮ ಪಡಿಸುವಿಕೆ, ಸೋರಿಕೆಗಳನ್ನು ತಡೆಗಟ್ಟುವಿಕೆ ಹಾಗೂ ತುರ್ತು ಕಾಮಗಾರಿಗಳತ್ತ ಗಮನಹರಿಸಿ ಅವುಗಳನ್ನು ಕಾರ್ಯರೂಪಕ್ಕೆ ತಂದಿದ್ದೇವೆ.</p>\r\n\r\n<p>ನಂದಿನಿ ಲೇಔಟ್‌ ಕ್ಲಬ್‌ ಒಂದು ಸದಸ್ಯರ ಕ್ಲಬ್‌, ಇದು ತನ್ನದೇ ಆದ ವೈಶಿಷ್ಠತೆಯನ್ನು ಹೊಂದಿದೆ ಹಾಗೂ ಉತ್ತಮ ಸದಸ್ಯ ವೃಂದವನ್ನು ಹೊಂದಿದೆ, ಚಿಕ್ಕದಾದರೂ ಚೊಕ್ಕವಾದ ವಾತಾವರಣ ಹೊಂದಿರುವ ನಮ್ಮ ಕ್ಲಬ್‌ ಬೆಂಗಳೂರಿನ ಪ್ರತಿಷ್ಠಿತ ಕ್ಲಬ್ಬಿನಲ್ಲೊಂದಾಗಿದ್ದು, ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಆಹಾರ, ಸೇವೆಗಳನ್ನು ಸದಸ್ಯರುಗಳಿಗೆ ಹಾಗೂ ಸಂಯೋಜಿತ ಕ್ಲಬ್‌ ಗಳ ಸದಸ್ಯರುಗಳಿಗೆ ನೀಡಲಾಗುತ್ತಿದೆ, ಮೂರು ಹವಾನಿಯಂತ್ರಿತ ಅತಿಥಿಗೃಹಗಳು, ದೊಡ್ಡ ಸಭಾಂಗಣ, ಸಣ್ಣ ಸಭಾಂಗಣಗಳು, ಗ್ರಂಥಾಲಯ, ಜಿಮ್, ಶೆಟಲ್‌ ಕೋರ್ಟ್‌, ಫ್ಯಾಮಿಲಿ ರಸ್ಟೋರಂಟ್‌, ಮೆನ್ಸ್‌ ಬಾರ್‌ (ಕ್ಲಬ್‌ ಸದಸ್ಯರುಗಳಿಗೆ ಮಾತ್ರ) ರೂಫ್‌ ಗಾರ್ಡನ್‌ ಇದೆ.</p>\r\n\r\n<p>ಸದಸ್ಯರುಗಳ ನಿಯಮಿತ ಸಹಕಾರ ಕ್ಲಬ್‌ ಮುನ್ನಡೆಗೆ ಸಹಕಾರವಾಗುತ್ತದೆ ಎಂಬ ಧ್ಯೇಯದೊಡನೆ ಎಲ್ಲ ಸದಸ್ಯರುಗಳ ಸಹಕಾರವನ್ನು ಬಯಸುತ್ತೇನೆ.</p>\r\n\r\n<p>ಶುಭ ವಂದನೆಗಳೊಂದಿಗೆ</p>\r\n\r\n<p>ಬಾಬು ಮೊಯ್ಲಿ ಎಂ ಸಿ</p>\r\n<p>ಗೌ.ಕಾರ್ಯದರ್ಶಿ</p>', 'Secretary\'s Message | Nandini Layout Club', 'Message from the Honorary Secretary of Nandini Layout Club.', NULL, 1, '2026-05-28 07:26:46', '2026-05-28 09:03:12');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `designation` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `rating` tinyint(4) DEFAULT 5,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `designation`, `message`, `photo_url`, `rating`, `is_active`, `created_at`) VALUES
(1, 'Rajesh Kumar', 'Member since 2010', 'Nandini Layout Club has been our second home for over a decade. The facilities are world-class and the staff is always warm and welcoming.', NULL, 5, 1, '2026-05-28 07:26:47'),
(2, 'Priya Sharma', 'Family Member', 'The club offers excellent facilities for the whole family. My children love the sports courts and we all enjoy the restaurant.', NULL, 5, 1, '2026-05-28 07:26:47'),
(3, 'Dr. Arun Patel', 'Corporate Member', 'Excellent venue for corporate events and meetings. The banquet facilities are top-notch and the catering is superb.', NULL, 5, 1, '2026-05-28 07:26:47'),
(4, 'Sunita Reddy', 'Senior Member', 'I have been a member since the early days. This club has grown tremendously while maintaining its warmth and community spirit.', NULL, 5, 1, '2026-05-28 07:26:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `affiliated_clubs`
--
ALTER TABLE `affiliated_clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `committee_members`
--
ALTER TABLE `committee_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_inquiries`
--
ALTER TABLE `contact_inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_events`
--
ALTER TABLE `news_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `affiliated_clubs`
--
ALTER TABLE `affiliated_clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `committee_members`
--
ALTER TABLE `committee_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contact_inquiries`
--
ALTER TABLE `contact_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `memberships`
--
ALTER TABLE `memberships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news_events`
--
ALTER TABLE `news_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
