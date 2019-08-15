---
title: "The Jamboxx: A Jazz-Enabled MIDI Controller"
date: "2017-09-21"
---

The past few months I worked with my colleagues Ian Rios and Robert Smock on a unique challenge. We work with Albany Medical Center and Rensselaer Polytechnic Institute to bring electronic music to the disabled community via a revolutionarily designed MIDI controller that can be fully used with minimal neck movement.

The new MIDI Jamboxx will be a full concert performance instrument, played as anything from a Trumpet to a Piano, or even a drum machine. Designed in parallel with Ableton Live, the controller is meant not just for playing, but for creating music. The instrument can be tuned to any key, including blues scales, which allows seamless composition and jam sessions. You can view Robert Smock playing the Jamboxx with the RPI jazz ensemble [here](https://www.facebook.com/jamboxxmusic/?hc_ref=ARSJUMXl0tWGkyjm-cTrFO-fFJSei0Ik8oa8bmKoJE2oldJTEqPbDb2bLSx_AEfmb70&fref=nf).

When the three of us first came to My Music Machines, the Jamboxx was a Human Interface Device, and was designed to function much like a game controller, with solely one program and few preselected sounds. This was a huge problem, as any DAW, VST, or other music program would expect MIDI data. In order to turn this into a professional-grade controller, we needed to make sure that you could use industry standard tools. Ian first set out to solve the problem by creating a Max for Live patch in Ableton to convert the data in useable form. However, a USB Human Interface Device is only pinged every 20 ms, which was entirely too much latency to be useful. To solve this problem, Ian set up Max to instead ping the controller via constant interrupt transfer. This worked, but would slowly overload the CPU, to the point where Ableton would not run properly after approximately 40 minutes.

Clearly, we needed to overhaul this controller's firmware. This is where I come in. Having a look inside and at the old code, I determined that we were using a Microchip PIC18F45K50 along with a USART module. This was promising, as I could use standard Microchip libraries to implement most of this MIDI controller. Microchips like this one are coded primarily in C, so the vast majority of the code logic is exactly the same between chips. However, all chips are built a little differently, so there's usually a few pointers to tweak.

Once I had the Jamboxx output MIDI, Ian was able to delete half of his Max patch, and all of our latency issues were solved. In addition, we unlocked a grand expanse of creative possibilites for this controller, since it can be used with any DAW and with any sound you can imagine. This new firmware will be available as an update with the new Jamboxx Pro controllers.

![20664796_1479806855420863_5411322314588743946_n](images/20664796_1479806855420863_5411322314588743946_n.jpg)
