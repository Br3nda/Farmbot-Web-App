import * as React from "react";
import { mount } from "enzyme";
import { SensorReadings } from "../sensor_readings";
import { SensorReadingsProps } from "../interfaces";
import {
  fakeSensorReading, fakeSensor
} from "../../../__test_support__/fake_state/resources";
import * as moment from "moment";

describe("<SensorReadings />", () => {
  function fakeProps(): SensorReadingsProps {
    return {
      sensorReadings: [fakeSensorReading()],
      sensors: [],
      timeOffset: 0,
    };
  }

  it("renders", () => {
    const wrapper = mount(<SensorReadings {...fakeProps()} />);
    const txt = wrapper.text().toLowerCase();
    ["sensor history", "sensor", "time period", "end date", "deviation"]
      .map(string => expect(txt).toContain(string));
  });

  it("toggles previous", () => {
    const wrapper = mount<SensorReadings>(<SensorReadings {...fakeProps()} />);
    expect(wrapper.instance().state.showPreviousPeriod).toEqual(false);
    wrapper.instance().togglePrevious();
    expect(wrapper.instance().state.showPreviousPeriod).toEqual(true);
  });

  it("sets sensor", () => {
    const s = fakeSensor();
    const p = fakeProps();
    const wrapper = mount<SensorReadings>(<SensorReadings {...p} />);
    expect(wrapper.instance().state.sensor).toEqual(undefined);
    wrapper.instance().setSensor(s);
    expect(wrapper.instance().state.sensor).toEqual(s);
  });

  it("sets location", () => {
    const expectedLocation = { x: 1, y: 2, z: undefined };
    const wrapper = mount<SensorReadings>(<SensorReadings {...fakeProps()} />);
    expect(wrapper.instance().state.location).toEqual(undefined);
    wrapper.instance().setLocation(expectedLocation);
    expect(wrapper.instance().state.location).toEqual(expectedLocation);
  });

  it("sets end date", () => {
    const expected = 1515715140;
    const p = fakeProps();
    const wrapper = mount<SensorReadings>(<SensorReadings {...p} />);
    expect(wrapper.instance().state.endDate)
      .toEqual(moment(p.sensorReadings[0].body.created_at).unix());
    wrapper.instance().setEndDate(expected);
    expect(wrapper.instance().state.endDate).toEqual(expected);
  });

  it("sets time period", () => {
    const expected = 3600 * 24 * 7;
    const wrapper = mount<SensorReadings>(<SensorReadings {...fakeProps()} />);
    expect(wrapper.instance().state.timePeriod).toEqual(expect.any(Number));
    wrapper.instance().setTimePeriod(expected);
    expect(wrapper.instance().state.timePeriod).toEqual(expected);
  });

  it("sets deviation", () => {
    const expected = 1;
    const wrapper = mount<SensorReadings>(<SensorReadings {...fakeProps()} />);
    expect(wrapper.instance().state.deviation).toEqual(0);
    wrapper.instance().setDeviation(expected);
    expect(wrapper.instance().state.deviation).toEqual(expected);
  });
});
