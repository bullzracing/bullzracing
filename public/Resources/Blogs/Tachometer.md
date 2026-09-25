![Tachometer](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/TachoThumbnail.jpeg "class=max-w-14xsm")


## The Origins ##  
A Tachometer is used to Quantify the otherwise Qualitative *Wroom Wrooms* that your vehicle makes.    
On BZR3, we used a barebones setup with 11 monochrome Red, Green and Blue LEDs (3 Green, 4 Red and 4 Blue) to indicate the current RPM of the engine. This required a whole another Arduino Nano (Which is a microcontroller dev board I despise for a multitude of reasons) just for the tachometer along with two DIP based SN74HC595 Shift registers, making the whole setup (unnecessarily) bulky in my humble opinion. It also meant that the colours displayed for each level was fixed in hardware. The brightness control was purely hardware, based on the value of the current limiting resistor for each diode. Due to no proper on-field testing, the values chosen made the tachometer leds too bright, and caused physical discomfort for the driver; Ultimately leading to its removal from BZR3 for the SUPRA SAE competition that was held in August of 2025.  



## Brainstorming ##  
In conclusion, BZR4 needed a new tachometer. Something fancier. Something more Dynamic and a lot more flexible  
Immediately, Inspiration was drawn from the shift indicator lights present on many race cars from F1 and Nascar. The idea of operating it as a shift indicator, with a converging light pattern instead of a linear pattern was also considered.  
Finally, the chosen setup included the following:  

~ 11 Common Anode RGB THT LEDs: These would each represent 1k RPM, just like the old version, allowing us to represent our peak RPM of 10.5k RPM (A "flaw" as one might call it, is the 11th LED is never illuminated, but the choice is in software).



~ Custom PCB with all SMD components: After the horrendous space efficiency we achieved last time, I was determined to do better. Ever single component other than the LEDs were now in SMD package. A custom PCB was required to fit the module into a specifically designed space above the Display and now extra care was to be taken into routing the entire module within that footprint.



~ CH32V003 RISC-V based Microcontroller: To drive the display, I switched to a much cheaper, much smaller microcontroller platform, that also turned out to be much more reliable as well. I have a multitude of projects in the pipeline with this specific microcontroller, and I've been loving it so far. To Hell With The Nano!



## The Hardware ##  
### **Physical Form Factor:** ###
The tachometer to be designed was designated to be located above the display in an arc of a circle. The case for which was made integrated for both. Here is what the final model that was 3D printed using PLA looked like:
![Display and Tacho Case](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/TachoDisplayCase.png "class=max-w-14xsm")

Therefore, the physical form factor was well defined. The outline of the required shape was traced, along with the centres for the THT LED positions in order to ensure proper alligment. A DXF file was promptly drafted and imported into KiCad. Onto the *actual* hardware; The electronics.

### **High Level Block Diagram:** ###
![Hardware Block Diagram](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/TachoHighLevel.jpeg "class=max-w-14xsm")  
As the above block diagram represents, we are driving our 11 RGB LEDs from the outputs of two daisy chained SN74HC595 shift registers. This works quite neatly with SPI communication as we are able to directly send 16 bits of serial data at a time with each SPI transmission.  
The calculation of the RPM from the CrankShaftPosition sensor output (CKP: One square pulse every rotation of the Output Crankshaft) and the driving of the display through SPI signals sent to the Shift Registers, was done using a CH32V003F4U6 on a custom breakout board.  
Of the 16 push-pull outputs available to us on the shift registers, the first 11 are used to pull a corresponding common annode of the RGB LEDs high; Effectively "Selecting" it. The 12th, 13th and 14th outputs are used to sink the Red, Green and Blue cathodes (Which are all interconnected) to ground. The last 2 outputs are not connected.     

### **Hardware Schematic:** ###
![Hardware Block Diagram](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/TachoSchematic.png "class=max-w-14xsm")  
You may look at this and assume, "That's pretty neat. I just select the LEDs I want turned On using the first 11 bits, and choose whichever colour I want them to be using the 12th, 13th and 14th bit of the SPI serial data. But what if I wanted different parts of the display to be different colours?"  
Which is exactly the thought process I went through. In order to have multiple colours displayed simultaneously, the R, G and B colour lines will have to be decoupled for each section we want to operate different colours on. This will consequently require more mosfets as well, unless we are splitting them into 5 colour lines or more, in which case the Shift Register Outputs will be able to sink the current we are asking them to without the assistance of a mosfet as is the case here. (I've calculated a total peak current of around 125mA through the colour lines, while the datasheet of the shift registers state a maximum of about 10mA).  
To be fair, the current draw can be limited further by using larger value resistors at the common annodes (Testing with 330 ohm resistors, the brightness was just right. I opted for 220 ohm instead as I knew I was going to be implementing software PWM based Brightness dimming).  
The top left section might spike some interest with a diode and resistor seemingly wasting energy as it is connected between +5v and Gnd. Do not be fooled so easily my friends!(I may not look it but my stupidity does not extend to that extreme of a level). This section serves an important role of making the entire shift register control system able to operate on 3v3, to accomodate microcontrollers other than the V003, such as the V203 which operates from 1v8 to 3v3. How?  
Well, if you take a look at the datasheet for the [SN74HC595BRWNR](https://www.ti.com/lit/ds/symlink/sn74hc595b.pdf?HQS=dis-dk-null-digikeymode-dsf-pf-null-wwe&ts=1768275643289&ref_url=https%253A%252F%252Fwww.ti.com%252Fgeneral%252Fdocs%252Fsuppproductinfo.tsp%253FdistId%253D10%2526gotoUrl%253Dhttps%253A%252F%252Fwww.ti.com%252Flit%252Fgpn%252Fsn74hc595b "class=max-w-14xsm"), which is a 16 pin **X**QFN (**!!!Very important distinction from a 16 pin** QFN **package!!!**) we find that the minimum voltage threshold for a data High varies with the supplied VCC. At 6V, the data lines need to exceed 4.2V to register as a High. Similarly, at 4.5V, we require a minimmum of 3.15V. Hence, the Diode and bleeder resistor setup at the top left of the scematic serve the purpose of dropping the 5V input down to around 4.3V, allowing around 3V (70% of VCC) to register as a logic High. The bleeder resistor is required to bias the diode into its constant forward voltage drop region of operation.  
With all that said, the poor man's voltage regulator is left unused for our current application with the CH32V003.  

### **PCB Design:** ###
![PCB](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/PCB.png "class=max-w-14xsm")  
![PCB 3D View Front](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/PCBF.png "class=max-w-14xsm")  
![PCB 3D View Back](https://raw.githubusercontent.com/DavinciDaMaster/DaVinci/main/_entries/Tachometer_Media/PCBB.png "class=max-w-14xsm")   



## The Software ##
```c
#include "ch32fun.h"
#include <stdio.h>

#define PWM_DIM_PIN 3
#define LATCH_PIN 4
#define CLK_PIN 5
#define SER_DATA_PIN 6

// --- TUNING PARAMETERS ---
#define SLOW_SPI 0 // Set to 1 to slow down SPI for logic analyzer debugging (187.5kHz)
#define DIM       19      // 20-0 (0% to 100% duty cycle)
#define BLINK_PERIOD_MS  250    // 4Hz = 125ms ON, 125ms OFF.
#define MIN_VALID_PERIOD_US  5000    // Threshold: 12,000 RPM = ~200Hz = 5000us period.
// Any pulse shorter than 5000us is treated as noise and ignored.
#define FILTER_SIZE           11    // Must be an odd number (9, 11, 15) for a true median
#define SAMPLE_PERIOD_MS      20    // 20ms = 50Hz update rate
#define MAX_RPM_PER_SEC       15000 // RPM Ramprate    
#define MAX_RPM_STEP_PER_LOOP (MAX_RPM_PER_SEC / (1000 / SAMPLE_PERIOD_MS)) // 300 RPM per loop
// --- Constants ---
const uint32_t max_freq = 183;
const uint16_t red_bit   = (0x1 << 11); 
const uint16_t green_bit = (0x1 << 12); 
const uint16_t blue_bit  = (0x1 << 13);

// --- Globals ---
volatile uint32_t _millis_counter = 0;

// THE DUAL FRAME BUFFER
// The main loop sets these. The ISR displays them.
volatile uint16_t frame_a = 0; 
volatile uint16_t frame_b = 0;
volatile uint8_t  blink_active = 0; // 1 = Enable 2Hz blinking

// Sensor Globals
volatile uint32_t global_period_us = 0; 
volatile uint32_t last_capture_val = 0;
volatile uint32_t overflow_count = 0;

// --- 1. LOW LEVEL SPI ---
void Write595_ISR(uint16_t data) {
    while(!(SPI1->STATR & SPI_STATR_TXE));
    SPI1->DATAR = data;
    while(SPI1->STATR & SPI_STATR_BSY);
    GPIOC->BSHR = (1 << LATCH_PIN); 
    asm("nop"); 
    GPIOC->BCR = (1 << LATCH_PIN); 
}

// --- 2. SYSTICK HANDLER (Updates every 1ms AKA 1000Hz) ---
void SysTick_Handler(void) __attribute__((interrupt));
void SysTick_Handler(void) {
    SysTick->SR = 0;            
    _millis_counter++;          
    SysTick->CMP += 48000;      

    // 1. Handle 4Hz Blinking (Only if active)
    int display_on = 1;
    if (blink_active) {
        // Use Modulo Math for precise timing
        // This divides the counter by PERIOD and looks at the remainder.
        // If remainder is in the first half -> ON. Second half -> OFF.
        if ((_millis_counter % BLINK_PERIOD_MS) > (BLINK_PERIOD_MS / 2)) {
             display_on = 0;
        }
    }
    if (!display_on) {
        Write595_ISR(0); // Turn off display
        return;
    }

    // 2. Toggle Frames (Multiplexing)
    // Even ms: Frame A. Odd ms: Frame B.
    if (_millis_counter & 1) {
        Write595_ISR(frame_b);
    } else {
        Write595_ISR(frame_a);
    }
}

// --- Standard Init Functions ---
void Millis_Display_Init() {
    SysTick->CTLR = 0; SysTick->CNT = 0; SysTick->CMP = 48000; 
    SysTick->CTLR = (1 << 0) | (1 << 1) | (1 << 2);
    NVIC_EnableIRQ(SysTicK_IRQn);
}

void SPI_Init_16Bit() {
    RCC->APB2PCENR |= RCC_APB2Periph_GPIOC | RCC_APB2Periph_SPI1;
    GPIOC->CFGLR &= ~(0xFFF000 | 0xF000000); 
    GPIOC->CFGLR |= (0xB << (4*CLK_PIN)) | (0xB << (4*SER_DATA_PIN)) | (0x3 << (4*4 ));
    
    #if SLOW_SPI
        SPI1->CTLR1 = SPI_CTLR1_SSM | SPI_CTLR1_SSI | SPI_CTLR1_MSTR | 
                      SPI_CTLR1_DFF | SPI_CTLR1_BR_2 | SPI_CTLR1_BR_1 | SPI_CTLR1_BR_0 | SPI_CTLR1_SPE;
    #else
        SPI1->CTLR1 = SPI_CTLR1_SSM | SPI_CTLR1_SSI | SPI_CTLR1_MSTR | 
                      SPI_CTLR1_DFF | SPI_CTLR1_BR_1 | SPI_CTLR1_BR_0 | SPI_CTLR1_SPE;
    #endif
}

void PWM_Init_OE() {
    RCC->APB2PCENR |= RCC_APB2Periph_TIM1;
    GPIOC->CFGLR &= ~(0xF << (4*PWM_DIM_PIN)); GPIOC->CFGLR |= (0xB << (4*PWM_DIM_PIN)); 
    TIM1->PSC = 48 - 1; TIM1->ATRLR = 1000 - 1; 
    TIM1->CHCTLR2 |= TIM_OC3M_2 | TIM_OC3M_1 | TIM_OC3M_0 | TIM_OC3PE;
    TIM1->CCER |= TIM_CC3E; TIM1->BDTR |= TIM_MOE; TIM1->CTLR1 |= TIM_CEN;
}

void Sensor_InputCapture_Init() {
    RCC->APB1PCENR |= RCC_APB1Periph_TIM2;
    RCC->APB2PCENR |= RCC_APB2Periph_GPIOD;
    GPIOD->CFGLR &= ~(0xF << (4*4)); GPIOD->CFGLR |= (0x4 << (4*4));
    TIM2->PSC = 48 - 1; TIM2->ATRLR = 0xFFFF; 
    TIM2->CHCTLR1 |= TIM_CC1S_0 | (0xF << 4); TIM2->CCER |= TIM_CC1E;
    TIM2->DMAINTENR |= TIM_UIE | TIM_CC1IE; TIM2->CTLR1 |= TIM_CEN;
    NVIC_EnableIRQ(TIM2_IRQn);
}

void TIM2_IRQHandler(void) __attribute__((interrupt));
void TIM2_IRQHandler(void) {
    // 1. Handle Overflow (Always track time, even during noise)
    if (TIM2->INTFR & TIM_UIF) {
        TIM2->INTFR &= ~TIM_UIF; 
        overflow_count++;
    }

    // 2. Handle Capture
    if (TIM2->INTFR & TIM_CC1IF) {
        TIM2->INTFR &= ~TIM_CC1IF; // Clear flag
        
        uint32_t current_capture = TIM2->CH1CVR;
        uint32_t total_ticks = 0;
        
        // Calculate raw time difference
        if (current_capture >= last_capture_val) {
             total_ticks = (overflow_count * 65536) + (current_capture - last_capture_val);
        } else {
             total_ticks = ((overflow_count - 1) * 65536) + ((65536 - last_capture_val) + current_capture);
        }

        // // --- NOISE FILTER START ---
        // // Only update global data if the pulse is realistic (> 5000us) [Software Low-Pass Filter]
        if (total_ticks > MIN_VALID_PERIOD_US) {
            global_period_us = total_ticks;
            // Only update 'last_capture' if we accepted the pulse.
            // If we ignore it, we effectively "bridge" over the noise spike 
            // to measure the time to the NEXT valid pulse.
            last_capture_val = current_capture;
            overflow_count = 0;
        }
        else {
        // It was noise! Do NOT reset overflow_count or last_capture_val.
        // We pretend this interrupt never happened.
        }
        // --- NOISE FILTER END ---
    }
}
static inline uint16_t lsb_mask_u16(unsigned i) {
    if (i == 0) return 0U;
    if (i >= 12) return 0x0FFF;
    return (uint16_t)((1U << i) - 1U);
}

uint32_t millis() { return _millis_counter; }
void delay(uint32_t ms) {
    uint32_t start = millis();
    while ((millis() - start) < ms) asm("nop");
}

// --- HELPER FUNCTION: N-Tap Median Filter ---
uint32_t get_median(uint32_t* array, uint8_t size) {
    // Fixed-size array on the stack (11 * 4 bytes = 44 bytes, perfectly safe for CH32V003)
    uint32_t temp[FILTER_SIZE]; 
    
    // Copy array
    for (int i = 0; i < size; i++) temp[i] = array[i];
    
    // Bubble Sort
    for (int i = 0; i < size - 1; i++) {
        for (int j = i + 1; j < size; j++) {
            if (temp[j] < temp[i]) {
                uint32_t t = temp[i];
                temp[i] = temp[j];
                temp[j] = t;
            }
        }
    }
    return temp[size / 2]; // Return the middle element
}

// --- MAIN LOGIC ---
int main()
{
    SystemInit();
    SPI_Init_16Bit();
    PWM_Init_OE();
    Sensor_InputCapture_Init();
    Millis_Display_Init();
    
    TIM1->CH3CVR = (uint16_t)((20 - DIM)*50); // Set PWM duty cycle (0-20 mapped to 1000-0)
    
    int num_leds = 0;
    uint32_t last_calc_time = 0; 
    
    // Buffer for the larger Median Filter (Initialized to 0)
    uint32_t rpm_buffer[FILTER_SIZE] = {0};
    uint8_t  buf_idx = 0;
    uint32_t displayed_rpm = 0; 

    while(1)
    {
        // Run at 20Hz (every 50ms)
        if (millis() - last_calc_time >= SAMPLE_PERIOD_MS) {
            last_calc_time = millis();
            
            // 1. Snapshot volatile variables
            uint32_t period = global_period_us;
            uint32_t ovf_count = overflow_count;
            uint32_t raw_rpm = 0;

            // 2. Calculate Raw RPM
            if (ovf_count > 5) {
                // Engine stalled / stopped (> 325ms since last pulse)
                raw_rpm = 0;
            } else if (period > 0) {
                // 1 Pulse Per Rev assumption (60,000,000 / period in us)
                raw_rpm = 60000000UL / period;
            }

            // 3. Apply 11-Tap Median Filter
            rpm_buffer[buf_idx] = raw_rpm;
            buf_idx = (buf_idx + 1) % FILTER_SIZE;
            uint32_t target_rpm = get_median(rpm_buffer, FILTER_SIZE); //Circular buffer median

            // 4. Apply Slew Rate Limiter (Max 500 RPM per loop)
            int32_t max_step = MAX_RPM_STEP_PER_LOOP; 
            int32_t rpm_diff = (int32_t)target_rpm - (int32_t)displayed_rpm;

            if (rpm_diff > max_step) {
                displayed_rpm += max_step; // Clamp acceleration
            } else if (rpm_diff < -max_step) {
                displayed_rpm -= max_step; // Clamp deceleration
            } else {
                displayed_rpm = target_rpm; // Track normally
            }

            // 5. Convert Smoothed RPM to LEDs
            num_leds = displayed_rpm / 1000;
            if (num_leds > 11) num_leds = 11;
        }
    
        //--- DISPLAY LOGIC ---
        uint16_t next_frame_a = 0;
        uint16_t next_frame_b = 0;
        uint8_t  next_blink   = 0;

        if (num_leds <= 4) {
            uint16_t mask = lsb_mask_u16(num_leds);
            next_frame_a = mask | green_bit;
            next_frame_b = 0; 
        } //Sets 1-3 LEDs green when RPM is between 0-4999
        else if (num_leds <= 8) {
            uint16_t green_part = lsb_mask_u16(4);          
            uint16_t red_part   = lsb_mask_u16(num_leds) & ~green_part;
            
            next_frame_a = green_part | green_bit;
            next_frame_b = red_part   | red_bit;
        } // Sets 1-3 LEDs green and 4-7 LEDs red when RPM is between 4000-8999
        else {
            uint16_t mask = lsb_mask_u16(num_leds);
            next_frame_a = mask | red_bit;
            next_frame_b = mask | blue_bit;
            next_blink = 1;
        }// Sets all LEDS purple (Red + Blue via 500Hz temporal colour dithering) and enables 4Hz blinking when RPM is between 9000-11999

        blink_active = next_blink;
        frame_a = next_frame_a;
        frame_b = next_frame_b;
    } 
}
```



## Completed Product in Action ## 
<div style="display:flex; justify-content:center; margin:2rem 0;">
  <div style="
    width:60%;
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 2px 8px rgba(0,0,0,0.12);
  ">
    <video controls width="100%" style="display:block;">
      <source src="/Resources/Blogs/TachoComplete.mp4" type="video/mp4">
    </video>
  </div>
</div>