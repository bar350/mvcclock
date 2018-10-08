<template>
    <StackLayout class="home-panel">
        <Button text="UpdateTime" @tap="setTime" />
        <Button text="UpdateSeconds" @tap="setSecond" />
        <Button text="UpdateDate" @tap="setDate" />
        <Button text="UpdateNow" @tap="setNow" />
        <Button text="Undo" @tap="undo" />
        <Button text="Redo" @tap="redo" />

        <Button text="Add Digital Clock" @tap="addDigital" />
        <Button text="Add Analog Clock" @tap="addAnalog" />
    </StackLayout>
</template>

<script>
    const ModalPicker = require("nativescript-modal-datetimepicker")
        .ModalDatetimepicker;

    import Event from './Event.js'
    import SecondDialog from "./SecondDialog.vue";
    export default {
        name: "TimeInterface",
        data() {
            return {
                setTimeEvent: new Event(),
                setSecondEvent: new Event(),
                setDateEvent: new Event(),
                setNowEvent: new Event(),
                undoEvent: new Event(),
                redoEvent: new Event(),
                datetimepicker: new ModalPicker(),
            }
        },
        props: [ 'controller'],
        created: function() {
            this.controller.addView(this);
        },
        components: {
          SecondDialog
        },
        methods: {
            setTime() {
                var vm = this
                this.datetimepicker
                    .pickTime()
                    .then(result => {
                        vm.setTimeEvent.notify({hour: result.hour, minute: result.minute})
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            },
            setSecond() {
                var vm  = this
                this.$showModal(SecondDialog).then(data => vm.setSecondEvent.notify({seconds: data}));
                /*action("Your message", "Cancel button text", [0,1,2,3,4,5,6,7,8,9,10,
                    11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
                    33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,
                    55,56,57,58,59])
                    .then(result => {
                        vm.setSecondEvent.notify({seconds: result})
                    });*/

            },
            setDate() {
                var vm = this
                this.datetimepicker
                    .pickDate({
                        title: "Select A Date",
                        theme: "light"
                    })
                    .then(result => {
                        vm.setDateEvent.notify({year: result.year, month: result.month, day: result.day})
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });

            },
            setNow() {
                this.setNowEvent.notify({})
            },
            undo() {
                this.undoEvent.notify({})
            },
            redo() {
                this.redoEvent.notify({})
            },
            addDigital() {
                this.$emit('addtab', {title:'Digital Clock', component:'DigitalClock' })
            },
            addAnalog() {
                this.$emit('addtab', {title:'Analog Clock', component:'AnalogClock' })
            }
        }
    }
</script>

<style scoped>

</style>