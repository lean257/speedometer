const config = {
  defaultTitle: 'PokeDOM',
  defaultChartOptions: {
    responsive: true,
    datasetFill: false,
    scaleBeginAtZero: true,
    scaleStartValue: 0,
    scaleIntegersOnly: true,
    scaleStepWidth: 1000,
    scaleOverride: true,
    scaleSteps: 10,
    scaleLabel: '<%= value %> ms',
    tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %> ms',
  },
};

export default config;
