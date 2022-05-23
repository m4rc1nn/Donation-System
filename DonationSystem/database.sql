-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql41.mydevil.net
-- Czas generowania: 23 Maj 2022, 21:56
-- Wersja serwera: 8.0.29
-- Wersja PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `m1004_donation-system`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `configuration`
--

CREATE TABLE `configuration` (
  `input_key` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8_polish_ci NOT NULL,
  `input_value` text CHARACTER SET utf8mb3 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `configuration`
--

INSERT INTO `configuration` (`input_key`, `input_value`) VALUES
('audio-link', 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3'),
('donate-text', '{NICKNAME} wysłał {AMOUNT}zł. {TEXT}'),
('donate-time', '8000'),
('logo-link', 'https://purepng.com/public/uploads/large/google-stadia-logo-3cx.png'),
('min-amount', '50');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `donation_queue`
--

CREATE TABLE `donation_queue` (
  `id` varchar(64) COLLATE utf8_polish_ci NOT NULL,
  `status` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8_polish_ci NOT NULL DEFAULT 'NOT_SHOWN',
  `display_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `donation_queue`
--

INSERT INTO `donation_queue` (`id`, `status`, `display_time`) VALUES
('TEST-DONATION', 'SHOWN', '2022-05-23 16:18:57');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(64) COLLATE utf8_polish_ci NOT NULL,
  `time_start` datetime NOT NULL,
  `time_end` datetime NOT NULL,
  `nickname` text COLLATE utf8_polish_ci NOT NULL,
  `text` text COLLATE utf8_polish_ci NOT NULL,
  `amount` int NOT NULL,
  `email` text COLLATE utf8_polish_ci NOT NULL,
  `payment_status` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `transaction`
--

INSERT INTO `transaction` (`id`, `time_start`, `time_end`, `nickname`, `text`, `amount`, `email`, `payment_status`) VALUES
('TEST-DONATION', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Testowy', 'Testowy donejt', 2222, 'Testowy@Testowy.pl', 'completed');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`input_key`);

--
-- Indeksy dla tabeli `donation_queue`
--
ALTER TABLE `donation_queue`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
