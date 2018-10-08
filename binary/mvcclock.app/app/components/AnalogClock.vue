<template>
    <StackLayout class="home-panel">
        <StackLayout height="500px">
            <RadRadialGauge :title="dateDisplay" :subtitle="timeDisplay">
                <TitleStyle v-tkRadialGaugeTitleStyle ios:textSize="12" ios:verticalOffset="30" android:verticalOffset="90" />
                <RadialScale v-tkRadialGaugeScales minimum="0" maximum="60" radius="0.90" sweepAngle="360" startAngle="270">
                    <ScaleStyle v-tkRadialScaleStyle majorTicksCount="13" majorTicksLength="30" majorTicksWidth="5" majorTicksFillColor="#333333"
                                labelsVisible="false" minorTicksCount="4" lineThickness="1" labelsCount="12" ticksOffset="0" />
                    <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="60" location="0.69">
                        <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="blue" barWidth="0.08" />
                    </RadialBarIndicator>
                    <RadialNeedle v-tkRadialScaleIndicators :value="date.minute" isAnimated="true" animationDuration="1000">
                        <NeedleStyle v-tkRadialNeedleStyle length="0.7" fillColor="#333333" />
                    </RadialNeedle>
                    <RadialNeedle v-tkRadialScaleIndicators :value="hourValue" isAnimated="true" animationDuration="1000">
                        <NeedleStyle v-tkRadialNeedleStyle length="0.5" strokeWidth="3" fillColor="#333333" />
                    </RadialNeedle>
                    <RadialNeedle v-tkRadialScaleIndicators :value="date.second" isAnimated="true" animationDuration="1000">
                        <NeedleStyle v-tkRadialNeedleStyle length=".9" fillColor="#ff0000" topWidth=".7" bottomWidth=".7" circleRadius="4" />
                    </RadialNeedle>
                </RadialScale>
            </RadRadialGauge>
        </StackLayout>
    </StackLayout>
</template>

<script>
    require("nativescript-ui-gauge/vue");
    export default {
        name: "AnalogClock",
        data() {
            return {
                date: { hour: 3, minute: 2, second: 2, year: 2000, month: 2, day: 2},
            }
        },
        props: [ 'controller'],
        created: function() {
            this.controller.addView(this);
        },
        computed: {
          hourValue() {
              return this.date.hour * 5;
          },
          dateDisplay() {
              var monthArray = [
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
                  "December"
              ];
              return (
                  monthArray[this.date.month - 1] + " " + this.date.day + ", " + this.date.year
              );
          },
          timeDisplay() {
              var am = true;
              var hour = this.date.hour;
              if (hour >= 12) {
                  if(hour > 12) {
                      hour -= 12;
                  }
                  am = false;
              }
              return (
                  hour +
                  ":" +
                  this.date.minute.toString().padStart(2, "0") +
                  ":" +
                  this.date.second.toString().padStart(2, "0") +
                  " " +
                  (am ? "AM" : "PM")
              );
          }
        },
        methods: {
            updateDate(date) {
                this.date = date;
            }
        }
    }
</script>

<style scoped>

</style>