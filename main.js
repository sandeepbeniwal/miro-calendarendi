const DAY_BOX_HEIGHT = 100;
const DAY_BOX_WIDTH = 100;
const MONTH_BOX_HEIGHT = 100;
const DAY_NAME_HEIGHT = 50;
const MONTH_BOX_WIDTH = 7 * DAY_BOX_WIDTH;
const METADATA_DATE_FORMAT = "YYYY-MM-DD";
const SINGLE_BAR_COLORS = ["#8fd14f", "#4eaa40"];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // I know I can get this from moment / format / 'ddd'
function getSingleTopBarColor(number) {
    return SINGLE_BAR_COLORS[number % 2];
}

function drawIt(initialPosX, initialPosY, pData, calendarId) {
    pData = pData || moment();

    // this is drawing one month
    let widgetsToCreate = []
    let minDate = pData.clone().startOf('month').startOf('isoWeek');
    ;
    let maxDate = pData.clone().endOf('month').endOf('isoWeek');
    let monthNumber = pData.month();
    widgetsToCreate.push({
        type: 'shape',
        text: "<p>" + pData.format('MMMM YYYY') + "</p>",
        x: initialPosX + MONTH_BOX_WIDTH / 2,
        y: initialPosY + MONTH_BOX_HEIGHT / 2,
        width: MONTH_BOX_WIDTH,
        height: MONTH_BOX_HEIGHT,
        style: {
            backgroundColor: "#8fd14f",
            backgroundOpacity: 1,
            bold: 0,
            borderColor: "#808080",
            borderOpacity: 1,
            borderStyle: 2,
            borderWidth: 1,
            fontFamily: 0,
            fontSize: 24,
            highlighting: 0,
            italic: 0,
            shapeType: 3,
            strike: 0,
            textAlign: "c",
            textAlignVertical: "m",
            textColor: "#000000",
            underline: 0,
        }
    });

    for (let i = 0; i < 7; i++) {
        widgetsToCreate.push({
            type: 'shape',
            text: DAY_NAMES[i],
            x: initialPosX + DAY_BOX_WIDTH / 2 + DAY_BOX_WIDTH * i,
            y: initialPosY + MONTH_BOX_HEIGHT + DAY_NAME_HEIGHT / 2,
            width: DAY_BOX_WIDTH,
            height: DAY_NAME_HEIGHT,
            style: {
                backgroundColor: "#cee741",
                backgroundOpacity: 1,
                bold: 0,
                borderColor: "#808080",
                borderOpacity: 1,
                borderStyle: 2,
                borderWidth: 1,
                fontFamily: 10,
                fontSize: 24,
                highlighting: 0,
                italic: 0,
                shapeType: 3,
                strike: 0,
                textAlign: "c",
                textAlignVertical: "t",
                textColor: "#1a1a1a",
                underline: 0,
            }
        });
    }
    let tempMoment = minDate.clone();
    let days = 0;
    let todayFormattedText = moment().format(METADATA_DATE_FORMAT);
    while (tempMoment.isSameOrBefore(maxDate)) {
        let style;
        let metadata;
        let active = false;
        let dayFormattedText = tempMoment.format(METADATA_DATE_FORMAT);

        if (monthNumber === tempMoment.month()) {
            active = dayFormattedText === todayFormattedText;
            metadata = {
                [CLIENT_ID]: {
                    calendarId: calendarId,
                    date: dayFormattedText,
                    active: active

                }
            };
            if (active) {
                style = {
                    backgroundColor: "#e6e6e6",
                    backgroundOpacity: 1,
                    bold: 0,
                    borderColor: "#f24726",
                    borderOpacity: 1,
                    borderStyle: 2,
                    borderWidth: 3,
                    fontFamily: 10,
                    fontSize: 18,
                    highlighting: "",
                    italic: 0,
                    shapeType: 3,
                    strike: 0,
                    textAlign: "r",
                    textAlignVertical: "t",
                    textColor: "#1a1a1a",
                    underline: 0
                }
            } else {
                style = {
                    backgroundColor: "#e6e6e6",
                    backgroundOpacity: 1,
                    bold: 0,
                    borderColor: "#808080",
                    borderOpacity: 1,
                    borderStyle: 2,
                    borderWidth: 1,
                    fontFamily: 10,
                    fontSize: 18,
                    highlighting: "",
                    italic: 0,
                    shapeType: 3,
                    strike: 0,
                    textAlign: "r",
                    textAlignVertical: "t",
                    textColor: "#1a1a1a",
                    underline: 0
                }
            }
        } else {
            style = {
                backgroundColor: "#fbfbfb",
                backgroundOpacity: 1,
                bold: 0,
                borderColor: "#808080",
                borderOpacity: 1,
                borderStyle: 2,
                borderWidth: 1,
                fontFamily: 10,
                fontSize: 18,
                highlighting: "",
                italic: 0,
                shapeType: 3,
                strike: 0,
                textAlign: "r",
                textAlignVertical: "t",
                textColor: "#a4a4a4",
                underline: 0
            }
        }
        widgetsToCreate.push({
            type: 'shape',
            text: "" + tempMoment.date(),
            x: initialPosX + DAY_BOX_WIDTH / 2 + DAY_BOX_WIDTH * (tempMoment.isoWeekday() - 1),
            y: initialPosY + MONTH_BOX_HEIGHT + DAY_NAME_HEIGHT + DAY_BOX_HEIGHT / 2 + Math.floor(days / 7) * DAY_BOX_HEIGHT,
            width: DAY_BOX_WIDTH,
            height: DAY_BOX_HEIGHT,
            style: style,
            metadata: metadata
        });
        days++;
        tempMoment.add(1, 'days');
    }
    createWidgets(widgetsToCreate);
}

async function transitionCalendar(calendarId, days) {

    let activeWidgets = (await miro.board.widgets.get({
        metadata: {
            [CLIENT_ID]: {
                calendarId: calendarId,
                active: true
            }
        }
    }));
    if (activeWidgets.length === 0) return;

    moment(widgets[0].metadata[CLIENT_ID].date); //choosing one, if it would happen the date mismatch then well, we can then think how to tackle this, for now this case is going to be ignored.

    let activeStyle = widgets[0].style;
    let

}

let authorizer = new Authorizer(["boards:write", "boards:read"]);
miro.onReady(() => {

    miro.initialize({
        extensionPoints: {
            toolbar: {
                title: 'Import charts',
                toolbarSvgIcon: '<path d="M16 20C16 19.4477 16.4477 19 17 19H20V4H4V19H7C7.55228 19 8 19.4477 8 20C8 20.5523 7.55228 21 7 21H3C2.44772 21 2 20.5523 2 20V3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V20C22 20.5523 21.5523 21 21 21H17C16.4477 21 16 20.5523 16 20Z" fill="currentColor"/>' +
                    '<path d="M11 21.5C11 20.9477 11 16.8284 11 16.8284L9.41421 18.4142C9.02369 18.8047 8.39052 18.8047 8 18.4142C7.60948 18.0237 7.60948 17.3905 8 17L12 13L16 17C16.3905 17.3905 16.3905 18.0237 16 18.4142C15.6095 18.8047 14.9763 18.8047 14.5858 18.4142L13 16.8284C13 16.8284 13 20.9477 13 21.5C13 22.0523 12.5523 22.5 12 22.5C11.4477 22.5 11 22.0523 11 21.5Z" fill="currentColor"/>' +
                    '<path d="M13 6C13 6.55228 12.5523 7 12 7H6C5.44772 7 5 6.55228 5 6V6C5 5.44772 5.44772 5 6 5H12C12.5523 5 13 5.44772 13 6V6Z" fill="currentColor"/>' +
                    '<path d="M19 12C19 12.5523 18.5523 13 18 13H14C13.4477 13 13 12.5523 13 12V12C13 11.4477 13.4477 11 14 11H18C18.5523 11 19 11.4477 19 12V12Z" fill="currentColor"/>' +
                    '<path d="M15 9C15 9.55228 14.5523 10 14 10H9C8.44772 10 8 9.55228 8 9V9C8 8.44772 8.44772 8 9 8H14C14.5523 8 15 8.44772 15 9V9Z" fill="currentColor"/>',
                librarySvgIcon:
                    '<path d="M32 40C32 38.8954 32.8954 38 34 38H40V8H8V38H14C15.1046 38 16 38.8954 16 40C16 41.1046 15.1046 42 14 42H6C4.89543 42 4 41.1046 4 40V6C4 4.89543 4.89543 4 6 4H42C43.1046 4 44 4.89543 44 6V40C44 41.1046 43.1046 42 42 42H34C32.8954 42 32 41.1046 32 40Z" fill="#050038"/>' +
                    '<path d="M22 43C22 41.8954 22 33.6569 22 33.6569L18.8284 36.8284C18.0474 37.6095 16.781 37.6095 16 36.8284C15.219 36.0474 15.219 34.781 16 34L24 26L32 34C32.781 34.781 32.781 36.0474 32 36.8284C31.219 37.6095 29.9526 37.6095 29.1716 36.8284L26 33.6569C26 33.6569 26 41.8954 26 43C26 44.1046 25.1046 45 24 45C22.8954 45 22 44.1046 22 43Z" fill="#050038"/>' +
                    '<path d="M26 13C26 13.5523 25.5523 14 25 14H11C10.4477 14 10 13.5523 10 13V11C10 10.4477 10.4477 10 11 10H25C25.5523 10 26 10.4477 26 11V13Z" fill="#2D9CDB"/>' +
                    '<path d="M38 25C38 25.5523 37.5523 26 37 26H27C26.4477 26 26 25.5523 26 25V23C26 22.4477 26.4477 22 27 22H37C37.5523 22 38 22.4477 38 23V25Z" fill="#F2C94C"/>' +
                    '<path d="M30 19C30 19.5523 29.5523 20 29 20H17C16.4477 20 16 19.5523 16 19V17C16 16.4477 16.4477 16 17 16H29C29.5523 16 30 16.4477 30 17V19Z" fill="#EB5757"/>',

                onClick: async function () {
                    if (await authorizer.authorized()) {
                        let viewport = await miro.board.viewport.getViewport();
                        let x = viewport.x + 0.3 * viewport.width;
                        let y = viewport.y + 0.3 * viewport.height;
                        drawIt(x, y, moment(), "XYZ123");
                    }
                }
            }

        }
    })
})
