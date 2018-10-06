<template>
    <GridLayout class="message" colums="*" rows="auto, auto">
        <Label  :text="dateDisplay" col="0" row="0"/>
        <Label  :text="timeDisplay" col="0" row="1"/>
    </GridLayout>
</template>

<script>
    export default {
        name: "DigitalClock",
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

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>