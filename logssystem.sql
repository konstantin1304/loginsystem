-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 21 2020 г., 23:24
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `logssystem`
--

-- --------------------------------------------------------

--
-- Структура таблицы `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `val` varchar(50) NOT NULL,
  `changeValue` varchar(50) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `logs`
--

INSERT INTO `logs` (`id`, `name`, `data`, `val`, `changeValue`, `value`) VALUES
(1, 'Артур', '2020-01-09 17:37:29', 'qwerweqr', 'ewqrwqerwqe', 'Привет');

-- --------------------------------------------------------

--
-- Структура таблицы `person_update_email`
--

CREATE TABLE `person_update_email` (
  `id` int(11) NOT NULL,
  `email` varchar(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `person_update_email`
--

INSERT INTO `person_update_email` (`id`, `email`) VALUES
(1, 'test@gmail.com'),
(2, 'test2@gmail.com');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `userName` varchar(111) NOT NULL,
  `password` varchar(111) NOT NULL,
  `dataBaseLogg` varchar(111) NOT NULL,
  `tableLogg` varchar(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userName`, `password`, `dataBaseLogg`, `tableLogg`) VALUES
('admin', 'root', 'logssystem', 'users'),
('root', 'admin', 'logssystem', 'users');

-- --------------------------------------------------------

--
-- Структура таблицы `versions`
--

CREATE TABLE `versions` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `version1` text NOT NULL,
  `version2` text NOT NULL,
  `version3` text NOT NULL,
  `version4` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `versions`
--

INSERT INTO `versions` (`id`, `name`, `version1`, `version2`, `version3`, `version4`) VALUES
(1, 'Александра', '{\"name\":\"Митя10000\",\"lastName\":\"Иванова11\",\"age\":\"223123213\",\"type\":\"save\"}', '{\"name\":\"Митя12312\",\"lastName\":\"Иванова11\",\"age\":\"223123213\",\"type\":\"merge\"}', '{\"name\":\"Митя12312\",\"lastName\":\"Иванова11\",\"age\":\"223123213\",\"type\":\"merge\"}', '{\"name\":\"Митя12312\",\"lastName\":\"Иванова11\",\"age\":\"223123213\",\"type\":\"merge\"}'),
(2, 'Артур', '{\"name\":\"Артур111\",\"lastName\":\"Зуб\",\"age\":\"26\",\"type\":\"save\"}', '{\"name\":\"Артур\",\"lastName\":\"Лазарев\",\"age\":\"24\"}', '{\"name\":\"Артур\",\"lastName\":\"Ахметов\",\"age\":\"28\"}', '{\"name\":\"Артур\",\"lastName\":\"Мамаев\",\"age\":\"31\"}'),
(3, 'Игорь', '{\"name\":\"Игорь10000\",\"lastName\":\"Зуб111\",\"age\":\"26\",\"type\":\"save\"}', '{\"name\":\"Игорь\",\"lastName\":\"Игнатенко\",\"age\":\"24\"}', '{\"name\":\"Игорь1\",\"lastName\":\"Лазарев\",\"age\":\"24\",\"type\":\"save\"}', '{\"name\":\"Игорь\",\"lastName\":\"Шляпик\",\"age\":\"24\"}'),
(4, 'Виктория', '{\"name\":\"Виктория\",\"lastName\":\"Грищенко\",\"age\":\"20\",\"type\":\"merge\"}', '{\"name\":\"Виктория\",\"lastName\":\"Грищенко\",\"age\":\"20\",\"type\":\"merge\"}', '{\"name\":\"Виктория\",\"lastName\":\"Грищенко\",\"age\":\"20\",\"type\":\"merge\"}', '{\"name\":\"Виктория12312\",\"lastName\":\"Грищенко\",\"age\":\"20\",\"type\":\"save\"}');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `person_update_email`
--
ALTER TABLE `person_update_email`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userName`);

--
-- Индексы таблицы `versions`
--
ALTER TABLE `versions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `person_update_email`
--
ALTER TABLE `person_update_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `versions`
--
ALTER TABLE `versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
