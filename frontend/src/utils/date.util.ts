import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";

export const dateFormat = 'YYYY-MM-DD';

export const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    //! Can not select days before today
    return current && current < dayjs(new Date().setDate(new Date().getDate() - 1));
};

export const dateFormatter = (date: string | number | dayjs.Dayjs | Date | null | undefined, format: string) => {
    return dayjs(date).format(format)
}
