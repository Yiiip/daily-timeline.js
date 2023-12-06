/**
 * daily-timeline ©
 * Created by 刘英鹏 at 2017-04-03.
 * All rights reserved.
 */

var TIME_PERIODS = new Array(
	"  8 AM", "  9 AM", "10 AM", "11 AM",
	"12 AM", "  1 PM", "  2 PM", "  3 PM",
	"  4 PM", "  5 PM", "  6 PM", "  7 PM");

var CANVAS_ID = "dailyTimeline"; // Canvas id from html

var COLOR_PRIMARY = "#738FFE";
var COLOR_PRIMARY_TRANSPARENT = "rgba(115, 143, 254, 0.6)";
var COLOR_ACCENT = "#A7B9FF";
var COLOR_WARN = "#FF5555";
var COLOR_WARN_TRANSPARENT = "rgba(255, 85, 85, 0.7)";
var COLOR_POSITIVE = "#98DB4B";
var COLOR_FONT_BLACK = "#222222";

var BASE_TIME_HOUR = 8;
var BASE_TIME_MINUTES = BASE_TIME_HOUR * 60;

var SCHEDULE_WIDTH = 150; // the width of schedule grid
var SCHEDULE_MARGIN_LEFT = 120;

var HOUR_LINE_Y_INTERVAL = 120;
var HOUR_LINE_X_START = 100;
var HOUR_LINE_WIDTH = 700; // the width of time period line
var HOUR_LINE_X_END = HOUR_LINE_X_START + HOUR_LINE_WIDTH;
var HOUR_LINE_MARGIN_TOP = 50;

var HOUR_TEXT_MARGIN_TOP = HOUR_LINE_MARGIN_TOP + 8;
var HOUR_TEXT_MARGIN_LEFT = 15;

var TEN_MINUTES_LINE_Y_INTERVAL = HOUR_LINE_Y_INTERVAL / 6;
var TEN_MINUTES_LINE_MARGIN_TOP = HOUR_LINE_MARGIN_TOP + TEN_MINUTES_LINE_Y_INTERVAL;
var TEN_MINUTES_LENGTH = 10;
var TEN_MINUTES_X_END = HOUR_LINE_X_START + TEN_MINUTES_LENGTH;

var ONE_MINUTES_Y_INTERVAL = TEN_MINUTES_LINE_Y_INTERVAL / 10;

/*---------------------------All Constant Above---------------------------*/

var c = document.getElementById(CANVAS_ID);
var ctx = c.getContext("2d");

initHourLines();
initHourTexts();
init10MinutesIntervalLines();

/*---------------------------All Function Below---------------------------*/

function initHourLines() {
	ctx.beginPath();
	ctx.lineWidth = "2";
	ctx.strokeStyle = COLOR_PRIMARY;
	for(var i = 0; i < TIME_PERIODS.length; i++) {
		ctx.moveTo(HOUR_LINE_X_START, HOUR_LINE_Y_INTERVAL * i + HOUR_LINE_MARGIN_TOP);
		ctx.lineTo(HOUR_LINE_X_END, HOUR_LINE_Y_INTERVAL * i + HOUR_LINE_MARGIN_TOP);
		ctx.stroke();
	}
}

function init10MinutesIntervalLines() {
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = COLOR_ACCENT;
	for(var i = 0; i < 5 * TIME_PERIODS.length + 5; i++) {

		if((i + 1) % 6 == 0) {
			ctx.moveTo(HOUR_LINE_X_START, TEN_MINUTES_LINE_Y_INTERVAL * i + TEN_MINUTES_LINE_MARGIN_TOP + TEN_MINUTES_LINE_Y_INTERVAL);
			ctx.lineTo(TEN_MINUTES_X_END, TEN_MINUTES_LINE_Y_INTERVAL * i + TEN_MINUTES_LINE_MARGIN_TOP + TEN_MINUTES_LINE_Y_INTERVAL);
		} else {
			ctx.moveTo(HOUR_LINE_X_START, TEN_MINUTES_LINE_Y_INTERVAL * i + TEN_MINUTES_LINE_MARGIN_TOP);
			ctx.lineTo(TEN_MINUTES_X_END, TEN_MINUTES_LINE_Y_INTERVAL * i + TEN_MINUTES_LINE_MARGIN_TOP);
		}

		ctx.stroke();
	}
}

function initHourTexts() {
	ctx.font = "22px microsoft yahei";
	ctx.fillStyle = COLOR_FONT_BLACK;
	for(var i = 0; i < TIME_PERIODS.length; i++) {
		ctx.fillText(TIME_PERIODS[i], HOUR_TEXT_MARGIN_LEFT, HOUR_LINE_Y_INTERVAL * i + HOUR_TEXT_MARGIN_TOP);
	}
}

/**
 * 绘制日程格子
 * @param {String} startTime 开始时间（格式"xx:xx"）
 * @param {String} endTime 结束时间（格式"xx:xx"）
 * @param {String} contentText 文本内容（可选）
 */
function createSchedule(startTime, endTime, contentText) {
	var startArr = startTime.split(":");
	var startMinutes = parseInt(startArr[0]) * 60 + parseInt(startArr[1]) - BASE_TIME_MINUTES;
	var startY = startMinutes * ONE_MINUTES_Y_INTERVAL + HOUR_LINE_MARGIN_TOP;

	var endArr = endTime.split(":");
	var endMinutes = parseInt(endArr[0]) * 60 + parseInt(endArr[1]) - BASE_TIME_MINUTES;
	var scheduleInterval = endMinutes - startMinutes;
	var scheduleHeight = scheduleInterval * ONE_MINUTES_Y_INTERVAL;

	ctx.fillStyle = COLOR_WARN_TRANSPARENT;
	ctx.lineWidth = 1;
	ctx.strokeStyle = COLOR_WARN;
  ctx.strokeRect(HOUR_LINE_X_START + SCHEDULE_MARGIN_LEFT, startY, SCHEDULE_WIDTH, scheduleHeight);
	ctx.fillRect(HOUR_LINE_X_START + SCHEDULE_MARGIN_LEFT, startY, SCHEDULE_WIDTH, scheduleHeight); //左上角x, y 和 宽,高

	if (contentText == null) {
		contentText = "";
	}
	createTextInSchedule(startY, scheduleHeight, contentText);
}

/**
 * 绘制日程格子的文本内容
 * @param {Number} y
 * @param {Number} h
 * @param {String} text
 */
function createTextInSchedule(y, h, text) {
	ctx.font = "16px microsoft yahei";
	ctx.fillStyle = "white";
	ctx.textBaseline="middle";
	ctx.fillText(text, HOUR_LINE_X_START + SCHEDULE_MARGIN_LEFT + (SCHEDULE_WIDTH - ctx.measureText(text).width) / 2, y + h / 2);
}

/**
 * 绘制空数据时友好提示文本
 * @param {String} text
 */
function drawEmptyView(text) {
	redrawCanvas();
    ctx.font = "26px microsoft yahei";
    ctx.fillStyle = COLOR_POSITIVE;
    ctx.fillText(text, SCHEDULE_MARGIN_LEFT + 100, 2 * HOUR_LINE_MARGIN_TOP);
}

/**
 * 清空画布
 */
function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

/**
 * 重绘时间轴
 */
function redrawCanvas() {
    clearCanvas();
    initHourLines();
    initHourTexts();
    init10MinutesIntervalLines();
}
