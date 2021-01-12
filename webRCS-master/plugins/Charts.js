
import Vue from 'vue'

Vue.mixin({
    methods:{
        createCrossChart(data, init = false) {
            var canvas = document.getElementById("multiLineChart");
            var ctx = canvas.getContext('2d');
    

    
            var options = {
            tooltips: {
                enabled: true,
                mode: 'label'
            },
            legend: {
                display: true,
                labels: {
                fontColor: 'rgb(255, 99, 132)'
                }
            },
            };
    
            // Chart declaration:
            var multiLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
            });
    
    
            // The Idea:
    
            // multiLineChart.legend.legendItems[0].hidden = true;
            // multiLineChart.data.datasets[0].hidden = true;
            // multiLineChart.legend.legendItems[1].hidden = true;
            // multiLineChart.data.datasets[1].hidden = true;
    
    
            multiLineChart.legend.legendItems.forEach(function(label, key) {
                if (!init) {
                    multiLineChart.legend.legendItems[key].hidden = true;
                    multiLineChart.data.datasets[key].hidden = true;        
                }
            });
    
        }


    }
})