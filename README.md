# Caduceus

## Patients

Each patient is represented by one index of `mapping (uint256 => Patient) private patients` that is not null.

## Predictions

Each predition is represented by one static array related to a patient.<br>
We choose this way because it is not possible to have a setter/getter with to much params [ethereum.stackexchange](http://ethereum.stackexchange.com/questions/11089/setting-a-struct-once-cause-error-while-compiling-stack-too-deep)


#### Kidney Disease Detection

```
uint16[24] kidneyData;
----------------------------------------------------------------------------------------------------------------------------------------
|                   DECIMAL VALUE                     |  FLOAT VALUE  |                      NOMINAL VALUE                             |
----------------------------------------------------------------------------------------------------------------------------------------
|  0  | 1  | 2  | 3  | 4  | 5   | 6  | 7   | 8   | 9  | 10 | 11 | 12  | 13   | 14  | 15 | 16  | 17 | 18  | 19 | 20  | 21    | 22 | 23  |
| age | bp | sg | al | su | bgr | bu | sod | pcv | wc | rc | sc | pot | hemo | rbc | pc | pcc | ba | htn | dm | cad | appet | pe | ane |
----------------------------------------------------------------------------------------------------------------------------------------
```

> 'NA' is represented by maximum value of uint16 which is 65535

| Abréviation   |  Description  									|
|---------------|---------------------------------|
|     age       | age in years 										|
|     bp        | blood pressure in mm/Hg 				|
|     sg        | specific gravity (1.005,1.010,1.015,1.020,1.025) |
|     al        | Albumin (0,1,2,3,4,5) 					|
|     su        | Sugar (0,1,2,3,4,5)	 						|
|     rbc       | Red Blood Cells (normal,abnormal) |
|     pc        | Pus Cell (normal,abnormal) 			|
|     pcc       | Pus Cell clumps (present,notpresent) |
|     ba        | Bacteria (present,notpresent)	 	|
|     bgr       | Blood Glucose Random in mgs/dl	|
|     bu        | Blood Urea in mgs/dl 						|
|     sc        | Serum Creatinine in mgs/dl		 	|
|     sod       | Sodium in mEq/L		 							|
|     pot       | Potassium in mEq/L	 						|
|     hemo      | Hemoglobin hemo in gms 					|
|     pcv       | Packed Cell Volume	 						|
|     wc        | White Blood Cell in cells/cumm	|
|     rc        | Red Blood Cell in millions/cmm	|
|     htn       | Hypertension (yes,no) 					|
|     dm        | Diabetes Mellitus (yes,no)		 	|
|     cad       | Coronary Artery Disease (yes,no)|
|     appet     | Appetite (good,poor) 						|
|     pe        | Pedal Edema (yes,no) 						|
|     ane       | Anemia (yes,no)		 							|
