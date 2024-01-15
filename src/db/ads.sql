-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 15, 2024 at 09:20 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ads`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_ads`
--

CREATE TABLE `all_ads` (
  `id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `cat_id` int(20) NOT NULL,
  `content` text NOT NULL,
  `price` int(20) NOT NULL,
  `p_condition` enum('new','used') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `all_ads`
--

INSERT INTO `all_ads` (`id`, `title`, `username`, `date`, `cat_id`, `content`, `price`, `p_condition`) VALUES
(1, 'Home PC - Model 1', 'Author 59', '2024-01-09', 1, '                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In iusto quae impedit ab omnis facere doloribus natus magni ut blanditiis. Accusamus vitae nesciunt facere deleniti quis in. Ipsum, quis maiores.', 500, 'used'),
(2, 'Laptop - Model 2', 'Author 41', '2024-01-09', 3, 'This is a high performance laptop.', 1000, 'used'),
(3, 'GPU - Model 3', 'Author 27', '2024-01-09', 2, 'This is a powerful GPU.', 200, 'used'),
(4, 'Phone - Model 4', 'Author 12', '2024-01-09', 5, 'This is a smart phone with latest features.', 300, 'used'),
(5, 'Home PC - Model 5', 'Author 79', '2024-01-09', 1, 'This is a budget friendly home PC.', 400, 'used'),
(6, 'Laptop - Model 6', 'Author 60', '2024-01-09', 3, 'This is a laptop suitable for gaming.', 1200, 'new'),
(7, 'GPU - Model 7', 'Author 65', '2024-01-09', 2, 'This is a GPU suitable for graphic design.', 250, 'used'),
(8, 'Phone - Model 8', 'Author 45', '2024-01-09', 5, 'This is a phone with large storage.', 350, 'new'),
(9, 'Home PC - Model 9', 'Author 32', '2024-01-09', 1, 'This is a home PC with fast processor.', 550, 'used'),
(10, 'Laptop - Model 10', 'Author 23', '2024-01-09', 2, 'This is a laptop with long battery life.', 1100, 'new'),
(12, 'Edited Post 1', 'Author 1', '2022-07-07', 5, 'Test content', 201, 'used'),
(13, 'RTX3080 Ti', 'skirma', '2022-07-07', 2, 'used GPU', 450, 'used'),
(23, 'Alien Ware PC', 'skirma', '2024-01-11', 1, 'epic pc, but not', 2000, 'new'),
(24, 'Corsair PC', 'skirma', '2024-01-12', 1, 'new pc straight from manufactor', 2250, 'new'),
(25, 'test', 'testsdfs', '2024-01-12', 2, 'tesdsdfsdfg', 23234, 'new'),
(26, 'MacBook Pro M2', 'skirma', '2024-01-12', 3, 'new laptop', 3000, 'new');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(20) NOT NULL,
  `cat_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_name`) VALUES
(1, 'Desktop PCs'),
(2, 'Desktop Parts'),
(3, 'Laptops'),
(4, 'Laptop Parts'),
(5, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created`) VALUES
(3, 'skirma', 'james@secure.com', '$2a$10$zQgGlVG9s2OQmz4gN3ZsGOdftru4X2T95vpNk1YtIAz3GzQB3CbOy', '2024-01-08 19:40:58'),
(5, 'nerimantas', 'james@secure1.com', '$2a$10$/Zz/UgmGYqdWVB645rhUUuIJBzwVE2Oo/JUuGdW0tg9asnb1EYEUq', '2024-01-09 10:52:42'),
(6, 'test', 'james@secure3.com', '$2a$10$gr1L3sQwAzU21lLc6WPcQeh9mKh/CpGz.WQCKa4M09MKJFx1fXsBu', '2024-01-09 10:54:15'),
(12, 'test1', 'test1@secure.com', '$2a$10$VeVZwNFl9rqR5V6qmZ20SuuEIIV9rY1N7PDfoqBurt3KEAP8XkvrC', '2024-01-11 07:32:12'),
(15, 'test22', 'test@test2.lt', '$2a$10$urc1MYz6FkLcBU2hAc8a1.j3EdNlFdj6oG161a3zniWTzwlmSHb8m', '2024-01-11 09:27:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_ads`
--
ALTER TABLE `all_ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_ads`
--
ALTER TABLE `all_ads`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
