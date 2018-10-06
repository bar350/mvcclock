<template>
    <Page>
        <ActionBar title="MVC Clock Manager" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Time Controller">
                <GridLayout colums="*" rows="*">
                    <TimeInterface :controller="controller" @addtab="addTab"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem v-for="tab in tabs" :title="tab.title">
                <component :is="tab.component" :controller="controller" />
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import TimeController from './TimeController.js'
    import TimeInterface from './TimeInterface.vue'
    import AnalogClock from './AnalogClock.vue'
    import DigitalClock from './DigitalClock.vue'
    export default {
        data() {
          return {
              controller: new TimeController(),
              tabs: [ {title: 'Digital Clock', component: 'DigitalClock'}, {title: 'Analog Clock', component: 'AnalogClock'}]
          }
        },
        components: {
            TimeInterface,
            AnalogClock,
            DigitalClock
        },
        created: function() {
              this.controller.addView(this);
        },
        methods: {
            addTab(data) {
                this.tabs.push(data)
            }
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
