flowchart TD
  A[START (reset)] --> B[Init: I2C, OLED, BUF, flags]
  B --> C[Setup ExtInt on PIR_PIN (Y11) -> pir_irq]
  C --> D[Main loop: while True]
  D --> E{event_flag?}
  E -- No --> D
  E -- Yes --> F[Clear event_flag; call display_flash_and_beep()]
  F --> G[display_flash_and_beep: repeat 5x]
  G --> H[OLED show "Get People!!!"]
  H --> I[beep_sequence: for each (freq,dur)]
  I --> J[play_tone(freq,dur)]
  J --> K[DAC(1).write_timed(BUF, freq*len(BUF), CIRCULAR); delay; stop DAC]
  K --> L[wait pauses; continue loop]
  L --> D
