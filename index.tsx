import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as dayjs from "dayjs";
import { toast } from "react-toastify";

const dateBuilder = (y: number, m: number, d: number) =>
	new Date(`${y}-${m}-${d} 00:00:00`);

export const Calender = () => {
	const [year, setYear] = useState(dayjs().year());
	const [month, setMonth] = useState(dayjs().month());
	const [selectedDate, setSelectedDate] = useState(
		`${year}-${month}-${dayjs().date() + 1}`
	);
	let spanDaysLength =
		dayjs().year(year).month(month).day() === 0
			? 0
			: dayjs().year(year).month(month).day() - 1;

	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const yearsArray = useMemo(() => {
		let i = 1940;
		const max = 2099;
		const arr: number[] = [];

		while (i <= max) {
			arr.push(i);
			i++;
		}
		return arr;
	}, []);

	const UsingDayJs = () => {
		return (
			<div>
				<h2>Days {dayjs().daysInMonth()}</h2>
				<div className="text-center inline-block">
					<span className="font-bold">Controls</span>
					<div>
						<label htmlFor="month" className="px-2 font-semibold">
							Month -
						</label>
						<select
							value={month}
							onChange={(e) =>
								setMonth(parseInt(e.currentTarget.value))
							}
							className="outline"
							name="month"
							id="month"
						>
							{months.map((x, i) => (
								<option key={x} value={i}>
									{x}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="year" className="px-2 font-semibold">
							Month -
						</label>
						<select
							value={year}
							onChange={(e) =>
								setYear(parseInt(e.currentTarget.value))
							}
							className="outline"
							name="year"
							id="year"
						>
							{yearsArray.map((x, i) => (
								<option key={x} value={x}>
									{x}
								</option>
							))}
						</select>
					</div>
					<div className="grid grid-flow-row grid-cols-7 max-w-[320px] gap-2 m-2 border border-slate-900 p-2">
						{days.map((d, i) => (
							<div
								className="w-8 text-sm border hover:bg-slate-300 border-slate-800 flex justify-center items-center h-8"
								key={i}
							>
								{d}
							</div>
						))}
						{/* ------------SPAN------------ */}
						{Array(
							dayjs().year(year).month(month).set("date", 1).day()
						)
							.fill(0)
							.map((x, i) => {
								return (
									<div className="hover:bg-sky-200" key={i} />
								);
							})}
						{Array(dayjs().year(year).month(month).daysInMonth())
							.fill(0)
							.map((_, i) => {
								return (
									<div
										className={`w-8 border hover:bg-sky-300 border-slate-800 p-1 h-8 ${
											dayjs(
												`${year}-${month}-${i + 1}`
											).toString() ===
											dayjs(selectedDate).toString()
												? "bg-sky-500 hover:bg-sky-600"
												: ""
										}`}
										key={i}
										onClick={(_) =>
											setSelectedDate(
												`${year}-${month}-${i + 1}`
											)
										}
									>
										{i + 1}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<h2 className="text-xl font-bold">Calender</h2>
			<NativeDateCalender />
			{/* <UsingDayJs /> */}
			{/* <div>{dayjs(selectedDate).toString()}</div> */}
			{/* <div>{new Date().getDay()}</div> */}
		</div>
	);
};

const NativeDateCalender = () => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dummyDate = new Date();
	const [month, setMonth] = useState(dummyDate.getMonth() + 1);
	const [year, setYear] = useState(dummyDate.getFullYear());

	const [activeDate, setActiveDate] = useState<Date>(
		dateBuilder(year, month, dummyDate.getDate())
	);
	const [date, setDate] = useState(
		new Date(
			`${dummyDate.getFullYear()}-${
				dummyDate.getMonth() + 1
			}, ${dummyDate.getDate()}`
		)
	);

	useEffect(() => {
		setDate(dateBuilder(year, month, date.getDate()));
	}, [month, year]);

	const SpanEmpty = () => {
		const dateAsStr = `${date.getFullYear()}-${date.getMonth() + 1}-${1}`;
		
		return (
			<>
				{Array(new Date(dateAsStr).getDay())
					.fill(0)
					.map((_, i) => (
						<Cell key={i} value="" />
					))}
			</>
		);
	};

	const getTotalDaysOfMonth = useCallback(() => {
		return (type: "m" | "d") => {
			return type === "d"
				? new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
				: 12;
		};
	}, [date]);

	const yearsArray = useMemo(() => {
		let i = 1950;
		const max = 2099;
		const arr: number[] = [];

		while (i <= max) {
			arr.push(i);
			i++;
		}
		return arr;
	}, []);

	const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const dateAsStr = `${parseInt(e.currentTarget.value)}-${
			date.getMonth() + 1
		}-${date.getDate()}`;
		setDate(new Date(dateAsStr));
	};

	const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const dateAsStr = `${date.getFullYear()}-${
			e.currentTarget.value
		}-${date.getDate()}`;
		setDate(new Date(dateAsStr));
	};

	const onDayChange = (day: string) => {
		const dateAsStr = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${day} 00:00:00`;
		const changedDate = dateBuilder(
			date.getFullYear(),
			date.getMonth() + 1,
			parseInt(day)
		);
		setActiveDate(changedDate);
	};

	const MonthsController = () => {
		return (
			<div className="block">
				<button
					disabled={month <= 1}
					onClick={(_) => setMonth((p) => --p)}
					className={`hover:bg-sky-700 cursor-pointer px-2 py-[1px] bg-sky-600 inline-block text-white rounded-l-lg ${(month <= 1) && 'bg-sky-900 cursor-not-allowed hover:bg-sky-900'}`}
				>
					-
				</button>
				<div className="inline-block border-y w-[12rem] text-center font-semibold bg-sky-800 text-white border-sky-900 px-2">
					{months[month - 1]}
				</div>
				<button
					disabled={month >= 12}
					onClick={(_) => setMonth((p) => ++p)}
					className={`hover:bg-sky-700 cursor-pointer px-2 py-[1px] bg-sky-600 inline-block text-white rounded-r-lg ${(month >= 12) && 'bg-sky-900 cursor-not-allowed hover:bg-sky-900'}`}
				>
					+
				</button>
			</div>
		);
	};

	const YearsController = () => {
		return (
			<div className="block">
				<button
					disabled={year <= 1950}
					onClick={(_) => setYear((p) => --p)}
					className={`hover:bg-sky-700 cursor-pointer px-2 py-[1px] bg-sky-600 inline-block text-white rounded-l-lg ${(year <= 1950) && 'bg-sky-900 cursor-not-allowed hover:bg-sky-900'}`}
				>
					-
				</button>
				<div className="inline-block border-y w-[12rem] text-center font-semibold bg-sky-800 text-white border-sky-900 px-2">
					{year}
				</div>
				<button
					disabled={year >= 2099}
					onClick={(_) => setYear((p) => ++p)}
					className={`hover:bg-sky-700 cursor-pointer px-2 py-[1px] bg-sky-600 inline-block text-white rounded-r-lg ${(year >= 2099) && 'bg-sky-900 cursor-not-allowed hover:bg-sky-900'}`}
				>
					+
				</button>
			</div>
		);
	};

	return (
		<div className="border m-2 p-2 rounded-lg border-red-600 inline-block">

			{/* Months, Year controller */}
			<div className="flex items-center flex-col gap-2 my-1">
				{/* 
				<select
					onChange={onMonthChange}
					value={months[date.getMonth()]}
					name=""
					id=""
				>
					{months.map((x, i) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>

				<select
					onChange={onYearChange}
					value={date.getFullYear()}
					name=""
					id=""
				>
					{yearsArray.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
					 */}
				<MonthsController />
				<YearsController />
			</div>

			<button
				onClick={(_) => {
					setDate(
						dateBuilder(
							dummyDate.getFullYear(),
							dummyDate.getMonth() + 1,
							dummyDate.getDate()
						)
					);
					setActiveDate(
						dateBuilder(
							dummyDate.getFullYear(),
							dummyDate.getMonth() + 1,
							dummyDate.getDate()
						)
					);
					setMonth(dummyDate.getMonth() + 1);
					setYear(dummyDate.getFullYear());
				}}
				className="border-2 py-[1px] rounded-lg px-2  border-blue-600 mx-2 bg-sky-600 text-white hover:bg-sky-700"
			>
				Today
			</button>

			<div className="grid grid-cols-7 gap-1">
				{days.map((x) => (
					<Cell key={x} bordered={false} value={x} />
				))}
				<hr className="col-span-7 border border-slate-900" />
				<div className="col-span-7 grid grid-cols-7 gap-1">
					<SpanEmpty />
					{Array(getTotalDaysOfMonth()("d"))
						.fill(0)
						.map((_, i) => (
							<Cell
								onClick={onDayChange}
								active={
									activeDate.toString() ===
									new Date(
										`${date.getFullYear()}-${
											date.getMonth() + 1
										}, ${i + 1}`
									).toString()
								}
								key={i}
								value={`${i + 1}`}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

const Cell = ({
	value,
	bordered = true,
	active = false,
	onClick = (v) => {},
}: {
	value: string;
	bordered?: boolean;
	active?: boolean;
	onClick?: (v: string) => void;
}) => {
	return (
		<div
			onClick={(_) => onClick(value)}
			className={
				"flex justify-center items-center w-8 h-8 m-1 " +
				`${
					value === ""
						? ""
						: bordered &&
						  "border cursor-pointer border-slate-400 hover:bg-slate-300 rounded-md"
				} ${active && " bg-sky-600 text-white hover:bg-sky-700 "}`
			}
		>
			{value}
		</div>
	);
};
