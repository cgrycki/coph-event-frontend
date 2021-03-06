/** SVG Path data taken from Illustrator. */
// Dependencies
import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from '../utils/FloorplanFunctions';

// PATHS TAKEN FROM ILLUSTRATOR
const EXTERIOR_CLIP   = "M190.4,749.5,154,753.8,136,595.3H41.5V95l767.2-4V77.7L968,31.7h106v62l594,2,.7,489.3,60,.7,97.3,430.7-90.7,419.3s-4.2-.5-11.8-1.5c-69.9-9.1-428.2-55.2-428.2-55.2l-43.3,40-184.7-143.3-846.7,88L167.5,864.5,200.84,861Z" ;
const EXTERIOR_WALLS  = "M1295.3,1379l-43.3,40-184.7-143.3-846.7,88L167.5,864.5l96-10L252.2,744.1,154,753.8,136,595.3H41.5V95l767.2-4V77.7L968,31.7h106v62l594,2,.7,489.3,60,.7,97.3,430.7-90.7,419.3s-4.2-.5-11.8-1.5C1653.6,1425.1,1295.3,1379,1295.3,1379ZM190.4,749.5l10.6,109M1787.4,1195l-58-12.7-15.8,82.7,56,12.4m-5-532.7-58.1,13.5L1725,839l58-12.9";
const CLASS_AND_CAFE  = "M1093.83,853.33l1.83,14.83L1232,897.67l17.33-83.33L1086.67,781l2,22.33-9.83,1-3.43-29.73,11.6-1.2,249,52.9,4.4,41.8,3.3-.4.3,2.8,26.5-2.3-.4-3.3,13.9-1.4-2.9-27.6,122.5,26.5,1.3,12.7-28.4,2.9-2.2-19-5.5-1.2-49.9,5.7,17.5,172.1,56.3-5.5-.4-4.4,27.5-2.9,14.7,140.4-414,44.4-36.33-353.43Z";
const CLASS_N110      = "M1289.5,587.8V525.1h-9.1V95.7H1668l1.3,496.3-379.8-4.2-13.25-.1V582h-24v5.52l-3.75,0";
const CLASS_N120      = "M911,587.5H864.7V569.38l.1-393.23,86.7-74.65h210.3L1182.4,119l66.1,56.35V587.5h-290V563.67h-7v-2l-24-.06v1.91H911.12l-.08,24";
const DEPT_STUDENT    = "M430.9,587.8H46.3V99.7l289.2-2.4h0V283h95.4l.6,158.8Z";
const DEPT_ADMIN      = "M1012.9,784.4l52.4,482.9-837.5,87.8L175.55,882,174.4,871.6Z";
const DEPT_IT         = "M387.2,96.9h0l420.7-3.5,1.3,345.9H734.5v57.2H641.2v91l-210.3.3.6-146h89.3V237H387.2Z";
const ISLAND_CAFE     = "M1569,1005.66l8-.84,1.08,10.23-8,.84Zm-5.06,14.54,21-2.21m-20.91,3.35-8.9-84.67m0,0,22.16-2.33m-22,3.47,21-2.21m1-1.26,8.9,84.67m-9.92-83.41L1585,1018m-21-76.86.84,8,5.68-.6-.84-8Zm7.93,40-.72-6.82m-5.08-13a2.86,2.86,0,0,0,2.86,2.86m0,0a2.86,2.86,0,0,0,2.86-2.86m0,0a2.86,2.86,0,0,0-2.86-2.86m0,0a2.86,2.86,0,0,0-2.86,2.86m4.31,30.12a1.71,1.71,0,0,0,1.71,1.71m0,0a1.71,1.71,0,0,0,1.71-1.71m0,0a1.71,1.71,0,0,0-1.71-1.71m0,0a1.71,1.71,0,0,0-1.71,1.71m.6,5.68a1.71,1.71,0,0,0,1.71,1.71m0,0a1.71,1.71,0,1,0,0-3.43m0,0a1.71,1.71,0,0,0-1.71,1.71m-6.94,24.25,22.16-2.33";
const ISLAND_PLANT    = "M350.2,724.9l-4.73-45m59.36,4.47,3.62,34.42m15.34-57.83,5.84,55.6m-100-35,4.73,45m15.89-1.67-15.89,1.67m79.72-82H301.6m108.83,4H306m-4.44-4,4.15,39.49m.28-35.49,3.27,31.11m-19.71-22,4,38.39m0,0,37.07-3.9m15.89-1.67,58.25-6.12m3.62,34.42,21.18-2.23m-140-58.9,13.24-1.39M417,672.37l-111.2,11.69m106.81-15.24L309.31,679.67m106.53-17.89,7.94-.83M414,644.57l2.92,27.8m-4.39-3.55-2.13-20.25";
const STAIRS_OUTLINE  = "M163.4,888.5l-40.3,4.2m0,0L91.4,591M1885.5,890.1l-90-19.1m90,19.1-125.3,589.6M1252.1,1424l-431-90.7m474.2,47.5,464.9,98.9m-637.3-272.8,9.5-1m522.9,79.7-218.8-46.5m-615.4,94.2-2.7-25.5M936,658.67,948.9,778m0,0L812.8,791.8l-8.2-77.6,136.2-13.8m-85.3,44.36,89.14-9.06.71,7-89.14,9.06Zm803.7,541.74L1631,1419.2m62-271.9,85.2-9,35.1-164.8-5-22-70.5-15L1693,1147.3M803.9,72.4V25.1H970.5m-118,642.25L936,658.67m4,35-103.46,11";
const STAIRS          = "M1384.2,1226.5l-.3,1.5M454.5,386.3m-18,0h33.4m-33.3,14.6h33.3m-33.3,7.3h33.3m-33.3,7.3h33.3m-33.3,7.3h33.3m-33.3,7.3h33.3m-33.3,7.3h33.3m-33.3,0h33.3m0,1.3V348.4m-33.3,90.3V348.4m38.6,0v90.3m-5.3-90.3h5.3m-1,1h-3.3m-34.3-1h-1m35.3,89.4h3.3m-4.3.9h5.3m-39.6,0h1m34.3-.9V349.4m3.3,0v88.4m-37.6-88.1h33.3m-34.3-1.3v90.3m1-81.7h33.3m-33.3,7.4h33.3m-33.3-14.7h33.3m-33.3,22h33.3M436.6,379h33.3m-33.3,14.6H470M1132.6,829l72.1,15.3m-1.6,7.8-72.2-15.3m80.6-26-6.9,32.5m22-30.3-94.2-20m71.9,16.3-6.9,32.5m-.2-34-6.9,32.4m-.2-34-7,32.5m-7.3-35.5-7,32.5m-.2-34-6.9,32.5m-.2-34-6.9,32.4m-.3-34-6.9,32.5m-.2-34-6.9,32.5m-.3-34-6.9,32.5m-1.3-.3,74.1,15.7m-73.7-49.6,94.2,20.1m-22.6,39.3-74-15.8m76.1,6-2.1,9.8m-.7-1.2,1.6-7.8m21.7-30.3.2-1M1131,837.8l-6.9,32.5m14.1-31-6.9,32.5m14-30.9-6.9,32.4m14.1-30.9-6.9,32.5m14-31-6.9,32.5m14.1-31-6.9,32.5m14-31-6.9,32.5m14.1-30.9-6.9,32.5m14-31-6.9,32.5m-72.1-15.4,94.2,20.1m0,0-.2.9m-94.2-20,94.2,20M1132.6,829l-1.7,7.8m.9-9-2.1,9.7m-20.5,29.6-.2,1m23.4-75.1-.2.9m63.2,57.6-6.9,32.5m14-31-6.9,32.5M798.8,674.8l3.2,31.7m-10.4-31,3.2,31.7m-10.5-30.9,3.2,31.7M777,677l3.2,31.7m-10.4-31,3.2,31.7m-10.5-30.9,3.2,31.7m-10.5-31,3.2,31.7m-10.4-31,3.2,31.8m-10.5-31,3.2,31.7m-17.8-30.2,3.3,31.7m4-32.5,3.2,31.7m100.7-10.2L722.1,714.6l-3.2-31.7,132.6-13.5m-15.1,35.4L714.3,717.2l-.1-1.5,122.9-12.4m14.6-34.2L710.9,683.3l-.1-1.4,141.5-14.4m780.4,750.9-1.5-.3,28-131.3,1.4.3-27.9,131.3M1383.9,1228l275,58.4m0,0,.3-1.5m0,0-275-58.4m-161.4,16.8,160.8-16.9.2,1.5L1223,1244.8Zm-13.3,16.8,99.8,77.2m0,0,89.1,11.7m0,0,.2-1.5m0,0-88.8-11.6m0,0-99.4-77m0,0-.9,1.2m.9-1.2L1222,1244l1.2.9-11.6,14.9Zm-21.1,27.2,107,82.8m0,0,98.9,12.8m0,0-.2,1.5m0,0-99.3-12.9m0,0-107.3-83m0,0,.9-1.2m0,0h0m512.4-150.7,30.6-144.2m-32.1,143.9,30.7-144.2m0,0,1.4.3m.8-.5,66.6,14.1m-66.3-15.6,66.6,14.2m-66.9-12.7.3-1.5m-1.2,152.7,24.6-115.6m-23.1,115.9,24.2-114.2m-1.1-1.7,6.8,1.4m-5.7.3,3.9.9m38.4-23.3,1.5.3m-2-1.1.3-1.4m-18.3,96.4,20-93.9m-19.8,86.1,18.3-86.4m-56.6,116.3,20-94.2m-21.8,95.2,20-94m-60.1,106.5-1.5-.3m32,6.8,1.5.3m48.2-50.2,1.4.3m-490.2,232.5-.5.7m-.5.7-18.1,23.3m-.5.7-.5.6m14.3-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.6.6-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.5.6m14.3-30.5-.5.7m-.5.7-18.1,23.3m-.5.7-.5.6m14.3-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.7m-.5.6-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.6.6m14.4-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.5.6m14.4-30.5-.5.7m-.5.6-18.2,23.4m-.5.7-.5.6m14.4-30.4-.5.6m-.5.7-18.1,23.3m-.5.7-.5.7m14.3-30.5-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m127.6,45.2h0m-.2,1.5-.1.9m0,.4-3.9,29.7m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.9,29.7m-.1.8-.1.8m11.7-33.2h0m-.2,1.5-.1.9m-.1.4-3.8,29.7m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.2.8m0,.5-3.9,29.7m-.1.8-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.1.8m11.6-33.1h0m-.2,1.5-.1.8m0,.5-3.9,29.6m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.1.8m11.6-33.2h0m-.2,1.6-.1.8m0,.5L1372,1377m-.1.8-.1.9m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.2.8m11.7-33.2h0m-.2,1.5-.1.9m-.1.5-3.8,29.6m-.1.8-.1.9m316.9-252.2.8.2m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.1,27.3,5.8m.8.2.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.1,27.3,5.9m.8.1.9.2m-29.1-13.7.9.2m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.2,27.3,5.7m.8.2.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.9.2,27.2,5.8m.9.1.8.2m-29.1-13.6.9.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-27.5-20.8.9.2m.8.2,27.3,5.8m.8.2.8.1m26.8,57.4-.8-.2m-.8-.2-27.3-5.8m-3.2,7.4h0m2.4-7.6-.8-.1m32.1-.7-.8-.2m-.9-.1-27.3-5.8m-.8-.2-.8-.2m32.1-.6-.8-.2m-.8-.2-27.3-5.8m30.4-1-.8-.2m-.8-.1-27.3-5.8m-.8-.2-.8-.2m32-.6-.8-.2m-.8-.2-27.3-5.8m-.8-.2-.8-.1m32-.7-.8-.2m-.8-.1-27.3-5.8m-.8-.2-.8-.2m32.1-.6-.8-.2m-.9-.2-27.2-5.8m-.9-.2-.8-.1m32.1-.7-.8-.2m-.9-.1-27.2-5.8m-.8-.2-.9-.2m-25.8,84.2.8.1m-14-84.4.8.2m.9.1,27.2,5.8m.9.2.8.2M1182.9,805.07l-6.9,32.5";
const BASEMENT_BANNER = "M1390.7,1346.5l-80.9-10.6-98.2-76.1,11.6-14.9,160.7-16.9,275.3,58.5L1631,1419.2m-451.2-138.4,115.9,89.5,91.4,11.9M1172.3,1291l7.5-10.2";
const ELEV_WALL       = "M641.25,496.43l93.25.07h73v91h-7v-18h-153v18h-6.3ZM734.6,470.6l-.1,25.9Zm.9-27.6v-4M864.7,569.38l-57.2.13m58.2-367.13-57.2.13";
const ELEV_LIFT       = "M739,509.1h56.5v49.8H739Zm-47.6,53.7h21.1v-1.9H691.4Zm-19.7-1.9H650v1.9h21.7Zm-18.7-2h56.5V509.1H653Zm124.4,3.9h21.1v-1.9H777.4Zm-19.7-1.9H736v1.9h21.7Zm19.7-54.1h21.1v-1.9H777.4Zm-19.7-1.9H736v1.9h21.7Z";
const DOORS           = "M188.65,811l1.69-.18.14,1.29-1.69.18Zm1589.15,426,.27-1.27,1.66.35-.27,1.27ZM1188,1372.59l1-1.34,1,.8-1,1.34ZM1080.09,829.19l3-.32.14,1.29-3,.32ZM1049.3,1111a23.93,23.93,0,0,0,21.3-26.3h0m-23.92,2.53,23.77-2.5.13,1.19-23.77,2.5ZM811.4,568.8h1.3V572h-1.3Zm49.1,0h1.3V572h-1.3ZM812.7,596a23.9,23.9,0,0,0,23.9-23.9M860.5,596a23.9,23.9,0,0,1-23.9-23.9m-23.9,0h1.2V596h-1.2Zm46.7,0h1.2V596h-1.2Zm48.1,16.2h1.3v3.2h-1.3Zm-25.3,0h1.3v3.2h-1.3Zm1.4,3.2a23.9,23.9,0,0,0,23.9,23.9m-1.2-23.9h1.2v23.9h-1.2ZM734.6,441.1h3.2v1.3h-3.2Zm0,29.2h3.2v1.3h-3.2Zm3.2,0a27.91,27.91,0,0,0,27.9-27.9h0m-27.9,0h27.9v1.2H737.8Zm375.3,702.8a23.93,23.93,0,0,0-21.3,26.3h0m-.22-1.28,23.77-2.5.13,1.19-23.77,2.5Zm1.14-218.28,3.18-.33.14,1.29-3.18.33Zm2.6,25.1,3.18-.33.14,1.29-3.18.33ZM1069.2,955.8a23.91,23.91,0,0,0,26.3,21.2m-26.42-21.27,23.77-2.5.13,1.19-23.77,2.5ZM811.4,199.1h1.3v3.2h-1.3Zm49.1,0h1.3v3.2h-1.3Zm-23.9,0a23.9,23.9,0,0,0-23.9-23.9m23.9,23.9a23.9,23.9,0,0,1,23.9-23.9m-47.8-.1h1.2V199h-1.2Zm46.7,0h1.2V199h-1.2Zm345.2,413.2h1.3v3.2h-1.3Zm25.3,0h1.3v3.2h-1.3ZM1206,615.5a23.9,23.9,0,0,0,23.9-23.9h0m-24-.1h1.2v23.9h-1.2Zm95.1,24a23.9,23.9,0,0,0,23.9-23.9h0m23.9,23.9a23.9,23.9,0,0,1-23.9-23.9h0m-23.9-.1h1.2v23.9H1301Zm46.6,0h1.2v23.9h-1.2Zm247.5,24a23.9,23.9,0,0,0,23.9-23.9m23.9,23.9a23.9,23.9,0,0,1-23.9-23.9h0m-23.9-.1h1.2v23.9h-1.2Zm46.7,0h1.2v23.9h-1.2Zm-390.9-3.2h1.3v3.2h-1.3Zm25.2,0h1.3v3.2h-1.3Zm-23.9,27.2a23.9,23.9,0,0,0,23.9-23.9h0m-23.9-.1h1.2v23.9h-1.2Zm34.4,224.3a27.88,27.88,0,0,0-21.5-33.1m-6,27.5,5.8-27.29,1.17.25-5.8,27.29ZM495.9,250.7a23.9,23.9,0,0,0,23.9,23.9m-23.9-23.9h23.9v1.2H495.9ZM825.8,70.64l1.25-.36.87,3.08-1.25.36Zm47.3-13.4,1.25-.36.87,3.08-1.25.36Zm-23,6.56a23.9,23.9,0,0,0-29.5-16.5m29.5,16.5a23.9,23.9,0,0,1,16.5-29.5m-46,13,1.15-.33,6.53,23-1.15.33Zm44.9-12.8,1.15-.33,6.53,23-1.15.33Zm288.73,1344a23.79,23.79,0,0,0,33.5-4.3h0m4.3,33.5a23.89,23.89,0,0,1-4.3-33.5h0m-33.6,4.13,14.63-18.9,1,.8-14.63,18.9Zm38.27,29.31,14.61-18.92,1,.79-14.61,18.92ZM361.9,91.8A23.9,23.9,0,0,0,338,67.9h0m23.9,23.9a23.9,23.9,0,0,1,23.9-23.9m-47.8,0h1.3V91.8H338Zm46.5,0h1.3V91.8h-1.3Zm777.4,1275.6a23.79,23.79,0,0,0-4.3-33.5h0m33.6-4.3a23.89,23.89,0,0,1-33.5,4.3h0M1143,1328.73l.8-1,18.9,14.63-.8,1Zm28.47-36.67.8-1,18.9,14.63-.8,1Zm550.22-68a24,24,0,0,0,28.4-18.4h0m-28.4,18.4a23.85,23.85,0,0,1,18.4,28.4h0M1726,1202.16l.27-1.27,23.38,5-.27,1.27Zm-9.62,45.64.27-1.27,23.38,5-.27,1.27Zm64.79-11.1a24,24,0,0,0,28.4-18.4h0m-28.4,18.4a23.85,23.85,0,0,1,18.4,28.4h0m-14.08-50.24.27-1.27,23.38,5-.27,1.27Zm-9.68,45.54.27-1.27,23.38,5-.27,1.27ZM1717,798.5a23.87,23.87,0,0,0,18.1-28.5h0M1717,798.5a23.78,23.78,0,0,1,28.5,18.1h0m-33.9-41.3,23.32-5.21.28,1.27-23.32,5.21Zm10.1,45.3,23.32-5.21.28,1.27L1722,821.87Zm54.6-35.4a23.87,23.87,0,0,0,18.1-28.5h0m-18.1,28.5a23.78,23.78,0,0,1,28.5,18.1h0m-33.9-41.4,23.32-5.21.28,1.27-23.32,5.21Zm10.25,45.32,23.42-5.26.28,1.27-23.42,5.26ZM229.5,783.4a24,24,0,0,0,26.3,21.3h0m-21.3,26.2a23.91,23.91,0,0,1,21.3-26.3h0m-26.29-21.2,23.77-2.51.14,1.29-23.77,2.51Zm4.9,46.2,23.77-2.51.14,1.29-23.77,2.51Zm-73.11-39a24,24,0,0,0,26.3,21.3h0m-21.2,26.3a23.91,23.91,0,0,1,21.3-26.3h0m-26.39-21.2,23.77-2.51.14,1.29L161.44,792Zm4.9,46.2L190,834.39l.14,1.29-23.77,2.51ZM338.3,280.8h1.3v4.1h-1.3Zm25.2,0h1.3v4.1h-1.3Zm0,0a23.9,23.9,0,0,0-23.9-23.9h0m0,0h1.2v23.9h-1.2Zm851.55-127.31,2.06-2.45,1,.84-2.06,2.45Zm19.36,16.08,2.06-2.45,1,.84-2.06,2.45Zm2.09-2.57a23.93,23.93,0,0,0-2.9-33.7h0m-15.44,18.39,15.36-18.31.92.77-15.36,18.31ZM1082.41,853.45l3.18-.33.14,1.29-3.18.33Zm-5.1-48.9,3.18-.33.14,1.29-3.18.33ZM1080,829.7a23.89,23.89,0,0,0-21.3,26.2v.1m21.3-26.3a23.91,23.91,0,0,1-26.3-21.3h0m4.78,46.33,23.77-2.5.13,1.19-23.77,2.5Zm-4.8-46.3,23.77-2.5.13,1.19-23.77,2.5Zm290.05,59.24,1.29-.14.34,3.18-1.29.14Zm25.1-2.7,1.29-.14.34,3.18-1.29.14Zm0,.13a23.93,23.93,0,0,0-26.3-21.3h0m0-.07,1.19-.13,2.5,23.77-1.19.13Zm154.54,31.56,2-.21.14,1.29-2,.21Zm15.5,147.29,2-.21.14,1.29-2,.21Zm-14.8-146,1-.1,15.33,146-1,.1ZM563.55,828.35l1.29-.14.28,2.69-1.29.14Zm-25.1,2.7,1.29-.14.28,2.69-1.29.14ZM561,804.6a23.93,23.93,0,0,0-21.3,26.3h0m20.14-26.19,1.19-.13,2.5,23.77-1.19.13ZM527.5,588.3h1.3V591h-1.3Zm25.2,0H554V591h-1.3Zm-23.9,26.6A23.9,23.9,0,0,0,552.7,591m-23.9,0H530v23.9h-1.2Zm-293.4-2.7h1.3V591h-1.3Zm25.2,0h1.3V591h-1.3Zm-23.9,26.6A23.9,23.9,0,0,0,260.6,591m-23.9,0h1.2v23.9h-1.2Zm178-2.7H416V591h-1.3Zm-25.2,0h1.3V591h-1.3Zm1.3,2.7a23.9,23.9,0,0,0,23.9,23.9M413.6,591h1.2v23.9h-1.2Zm539.2-30.7v3.2m-26.6,0v-3.2m1.4,3.2a23.9,23.9,0,0,0,23.9,23.9m-1.2,0V563.5";
const FLOOR_GOOD      = "M1719.42,598H1652l-.39,18c-3,9.1-8.58,11-18.15,11h-31.61c-8.75,0-16.34-10.61-15.84-30.33h0l-215.54-1.49c0,25.86-10.71,30.82-20.29,31.82H1205.69c-19.09-4-19.69-37-19.69-37v2H961.67s2,28-27,35h-70l1.74,33.25L935.8,653l5,47.4L560,739l9.84,88.27L1012,780.12l75.17-10.73,169.38,35.7,5.48-26.36,5,1c12,3.75,20.25,11,23.75,28.25l-.5,4.5,45.88,9.15h0c8.82-24.55,50.17-13.25,46.63,10.26h0l124,27,2.55,16.17L1677,853.31l-10.41-44.48a51.76,51.76,0,0,1,39.2-62.38l44.22-9.79ZM330.1,731.92l108.32-12.25-6.66-58.39,31.91-2.49,11.42,100L267.2,782.41l-8.7-77.51,67.64-7.68Z";

const pathNames = [
  "EXTERIOR_CLIP",
  "DOORS",
  "STAIRS",
  "ELEV_WALL",
  "ELEV_LIFT",
  "BASEMENT_BANNER",
  "DEPT_IT",
  "DEPT_STUDENT",
  "DEPT_ADMIN",
  "ISLAND_PLANT",
  "CLASS_N120",
  "CLASS_N110",
  "CLASS_AND_CAFE",
  "ISLAND_CAFE",
  "FLOOR_GOOD",
  "STAIRS_OUTLINE",
  "EXTERIOR_WALLS"
];


const colors = {
  light_green : '#a1d99b',
  dark_green  : '#006d2c',
  none        : '#',
  white       : '#ffffff',
  light_grey  : '#e7e8e9',
  dark_grey   : '#666666',
  darkest_grey: '#333333',
  black       : '#000000'
}

const strokes = {
  thin: 1,
  thinner: 1.5,
  medium: 2,
  thicker: 3,
  thick: 15
}

const opacities = {
  low: 0.5,
  medium: 0.75,
  high: 1
}


export default class Floorplan extends React.Component {
  /** Returns SVG path data as a string */
  getPath = name => {
    const paths = {
      EXTERIOR_CLIP,
      EXTERIOR_WALLS,
      STAIRS_OUTLINE,
      FLOOR_GOOD,
      ISLAND_CAFE,
      CLASS_AND_CAFE,
      CLASS_N110,
      CLASS_N120,
      ISLAND_PLANT,
      DEPT_ADMIN,
      DEPT_STUDENT,
      DEPT_IT,
      BASEMENT_BANNER,
      ELEV_WALL,
      ELEV_LIFT,
      STAIRS,
      DOORS
    };

    return paths[name];
  }

  getFill = name => {
    const itemFills = {
      EXTERIOR_CLIP   : colors.white,
      EXTERIOR_WALLS  : colors.none,
      STAIRS_OUTLINE  : colors.none,
      FLOOR_GOOD      : colors.light_green,
      ISLAND_CAFE     : colors.white,
      CLASS_AND_CAFE  : colors.light_grey,
      CLASS_N110      : colors.light_grey,
      CLASS_N120      : colors.light_grey,
      ISLAND_PLANT    : colors.white,
      DEPT_ADMIN      : colors.light_grey,
      DEPT_STUDENT    : colors.light_grey,
      DEPT_IT         : colors.light_grey,
      BASEMENT_BANNER : colors.none,
      ELEV_WALL       : colors.light_grey,
      ELEV_LIFT       : colors.white,
      STAIRS          : colors.none,
      DOORS           : colors.none
    };
    return itemFills[name];
  }

  getFillEnabled = name => {
    const fillEnabled = {
      EXTERIOR_CLIP   : true,
      EXTERIOR_WALLS  : false,
      STAIRS_OUTLINE  : false,
      FLOOR_GOOD      : true,
      ISLAND_CAFE     : true,
      CLASS_AND_CAFE  : true,
      CLASS_N110      : true,
      CLASS_N120      : true,
      ISLAND_PLANT    : true,
      DEPT_ADMIN      : true,
      DEPT_STUDENT    : true,
      DEPT_IT         : true,
      BASEMENT_BANNER : false,
      ELEV_WALL       : true,
      ELEV_LIFT       : true,
      STAIRS          : false,
      DOORS           : false
    };
    return fillEnabled[name];
  }

  getStroke = name => {
    const itemStrokes = {
      EXTERIOR_CLIP   : colors.white,
      EXTERIOR_WALLS  : colors.darkest_grey,
      STAIRS_OUTLINE  : colors.dark_grey,
      FLOOR_GOOD      : colors.dark_green,
      ISLAND_CAFE     : colors.dark_grey,
      CLASS_AND_CAFE  : colors.dark_grey,
      CLASS_N110      : colors.dark_grey,
      CLASS_N120      : colors.dark_grey,
      ISLAND_PLANT    : colors.dark_grey,
      DEPT_ADMIN      : colors.dark_grey,
      DEPT_STUDENT    : colors.dark_grey,
      DEPT_IT         : colors.dark_grey,
      BASEMENT_BANNER : colors.dark_grey,
      ELEV_WALL       : colors.dark_grey,
      ELEV_LIFT       : colors.dark_grey,
      STAIRS          : colors.dark_grey,
      DOORS           : colors.dark_grey
    };
    return itemStrokes[name];
  }

  getStrokeWidth = name => {
    const widths = {
      EXTERIOR_CLIP   : strokes.thin,
      EXTERIOR_WALLS  : strokes.thick,
      STAIRS_OUTLINE  : strokes.thin,
      FLOOR_GOOD      : strokes.thinner,
      ISLAND_CAFE     : strokes.thin,
      CLASS_AND_CAFE  : strokes.medium,
      CLASS_N110      : strokes.medium,
      CLASS_N120      : strokes.medium,
      ISLAND_PLANT    : strokes.thin,
      DEPT_ADMIN      : strokes.medium,
      DEPT_STUDENT    : strokes.medium,
      DEPT_IT         : strokes.medium,
      BASEMENT_BANNER : strokes.medium,
      ELEV_WALL       : strokes.medium,
      ELEV_LIFT       : strokes.medium,
      STAIRS          : strokes.thin,
      DOORS           : strokes.thin
    };
    return widths[name];
  }

  getDash = name => {
    const dashes = {
      EXTERIOR_CLIP   : [0, 0],
      EXTERIOR_WALLS  : [0, 0],
      STAIRS_OUTLINE  : [5, 2.5],
      FLOOR_GOOD      : [10, 5],
      ISLAND_CAFE     : [0, 0],
      CLASS_AND_CAFE  : [0, 0],
      CLASS_N110      : [0, 0],
      CLASS_N120      : [0, 0],
      ISLAND_PLANT    : [0, 0],
      DEPT_ADMIN      : [0, 0],
      DEPT_STUDENT    : [0, 0],
      DEPT_IT         : [0, 0],
      BASEMENT_BANNER : [0, 0],
      ELEV_WALL       : [0, 0],
      ELEV_LIFT       : [0, 0],
      STAIRS          : [0, 0],
      DOORS           : [0, 0]
    };
    return dashes[name];
  }

  getOpacity = name => {
    const itemOpacities = {
      EXTERIOR_CLIP   :  opacities.high,
      EXTERIOR_WALLS  :  opacities.high,
      STAIRS_OUTLINE  :  opacities.high,
      FLOOR_GOOD      :  opacities.medium,
      ISLAND_CAFE     :  opacities.high,
      CLASS_AND_CAFE  :  opacities.medium,
      CLASS_N110      :  opacities.medium,
      CLASS_N120      :  opacities.medium,
      ISLAND_PLANT    :  opacities.high,
      DEPT_ADMIN      :  opacities.medium,
      DEPT_STUDENT    :  opacities.medium,
      DEPT_IT         :  opacities.medium,
      BASEMENT_BANNER :  opacities.high,
      ELEV_WALL       :  opacities.high,
      ELEV_LIFT       :  opacities.high,
      STAIRS          :  opacities.high,
      DOORS           :  opacities.high
    };

    return itemOpacities[name];
  }

  setCursor = (event, style) => {
    const floorGood = event.target;
    const stage                  = floorGood.getStage();
    const container              = stage.container();
          container.style.cursor = style;
  }

  render() {
    const { width, height }  = this.props;
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);
    
    return (
      <Layer name="Floorplan">
        {pathNames.map(name => {
          // Shape attributes
          const pathData    = this.getPath(name);
          const fill        = this.getFill(name);
          const fillEnabled = this.getFillEnabled(name);
          const stroke      = this.getStroke(name);
          const strokeWidth = this.getStrokeWidth(name);
          const dash        = this.getDash(name);
          const opacity     = this.getOpacity(name);
          
          return (
            <Path
              key={name}
              name={name}
              x={0}
              y={0}
              scaleX={scaleX}
              scaleY={scaleY}
              data={pathData}
              fill={fill}
              fillEnabled={fillEnabled}
              stroke={stroke}
              strokeWidth={strokeWidth}
              dash={dash}
              //fillOpacity={opacity}
              opacity={opacity}
              listening={name === 'FLOOR_GOOD'}
              onMouseOver={mouseEvt => this.setCursor(mouseEvt, 'copy')}
              onMouseOut={mouseEvt => this.setCursor(mouseEvt, 'default')}
            />
          );
        })} 
      </Layer>
    );
  }
}


