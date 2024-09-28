export const renameSensor = (type, whichSensor) => {
    let rename;
    switch (type) {
        case "analog":
            switch (whichSensor) {
                case 'first':
                    rename = "A1"
                    break;
                case "second":
                    rename = "A2"
                    break;
                case 'third':
                    rename = "A3"
                    break;
                case 'fourth':
                    rename = "A4"
                    break;
                default:
                    break;
            }
            break;
        case 'digital':
            switch (whichSensor) {
                case 'first':
                    rename = "D1"
                    break;
                case "second":
                    rename = "D2"
                    break;
                case 'third':
                    rename = "D3"
                    break;
                case 'fourth':
                    rename = "D4"
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return rename
}