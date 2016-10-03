const config = {
  defaultTitle: 'PokeDOM',
  defaultChartOptions: {
    animationEasing: 'linear',
    responsive: true,
    datasetFill: false,
    scaleIntegersOnly: false,
    scaleLabel: '<%= value %> ms',
    tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %> ms',
  },
};

export default config;
