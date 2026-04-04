---
title: My experience in Digital Hardware
---

I’ve had a lot of people ask about digital hardware, how it differs from CE, and whether or not they should enroll into it. Disclaimer to anyone reading this, I’m nearing my completion of my 2A co-op term, so my answers may not encapsulate everything about DH, and my opinion about it will change as I near the completion of my degree. This blog post is about my academic and career experiences, challenges, outlook on the current job market/industry, and aspirations for the future. There are many tips on reddit for anyone looking for general advice, and I will not go over most of them. This blog post is for people interested in what life as a DH entails and is an additional resource for anyone struggling whether or not to choose DH. It’s hard to find DH people, and resources are scarce. I try to be objective and it will be made obvious when something is very opinionated. If you want to read about my experience at Nokia, which I reference a lot in this post, you can find it [here](). (If I’ve gotten around to making it)

## What is Digital Hardware?

Digital hardware is a specialization option for CS students at UWaterloo. It’s declared at the end of the 1A term, when applications are due. Digital hardware dives into firmware and embedded systems. The full list of courses can be explored [here](https://cs.uwaterloo.ca/sites/default/files/uploads/documents/2023-2024_bcs_digital_hardware_specialization.pdf). You take the entire CS curriculum with added ECE electives (with the only replaced course being CS251 for ECE222, which both cover computer architecture fundamentals).

## What you take, and what you learn.

As of 2A, here is the takeaway from my courses:

- CS136: Functional vs imperative C
- ECE124: VHDL/FPGA programming, digital logic, state machines
- CS246: Object oriented programming, design patterns, C++
- ECE222: intro to comp arch, caching, memory, RISC-V assembly, some interrupts/RTOS
- CS245: discrete CS, some fundamentals for codeparsing and compilers
- STAT230/231/MATH239: math and stats for ML fundamentals

## How does it differ from CE?

This is the most interesting question DH students have. In the HW/SW boundary, there is always the issue of physical and logic constraints. From an academic standpoint, you miss out on electromagnetics (phys121 is recommended and covers only kinematics), semiconductors, signals, etc. The lowest you will ever go is MTE120/GENE123, linear circuits. In place of this, you get courses like CS241, CS444, MATH239. These courses have a hard focus on logic and computation. This puts DH at an advantage for compilers, embedded systems/software engineering and firmware, but not as much for PCB design or physical hardware creation, where signals/power matters most.

A good example of this is CS350 vs ECE350. I haven’t taken either, but from what I’ve heard they both focus on operating systems. The ECE version focuses on RTOS, interrupts, and scheduling. The CS version focuses on memory management, kernel space, and caching. You can probably see how ECE222 + CS350 can put you in a software leaning position compared to ECE222 + ECE350, even though ECE222 gives an intro to both.

Additionally, as a DH you have access to the Big 3 (CS444/CS451/CS488). ECE students will never get the time to do any of them. It is, however, known to be extremely intensive, so many CS majors don’t take them either. You’ll also have access to various ML courses.

This part is the blurriest out of everything else, I suspect because first/second year CS courses are very fundamental. I suspect the difference will be made much more clear later on, and I’ll provide updates to this blog as it does.

## Employer outlook

In my personal experience speaking to hiring managers at Nokia, you really need to prove your HW knowledge. No one really knows what DH is, since so little people get into it. Over time, your experience/projects will probably overshadow the degree name, but as a sophomore I need to constantly explain what it is to employers.

## Best parts of DH

The best part of DH is taking the “fun” ECE courses. You can learn about the RISC-V pipeline and focus on it logically, without needing to worry about electronic circuits right after. Granted, you need to worry about discrete computer science (yuck). ECE222 and 124 have been some of my favorite courses. Anyway, I would rather miss out on circuits than object oriented programming.

There is a hidden perk of DH: the Faculty of Math. You’ll get access to some exclusive stuff, including:

- MEF funding
- Flexible coop
- The CS name
- The ability to take ML courses and a lot more course flexibility

Additionally, one of my best friends is from ECE classes. You get to meet a whole new group of students, and the professors so far have been genuinely goated.

I also know someone taking on DH and AI specs at once (he’s doing compilers), which is honestly just a power play.

## Worst parts of DH

Labs. They take a lot of time. They’re fun, but for the love of God I don’t want to do this for 3h every other week on top of other assignments. CS courses are highly theoretical, and the work is often as if they’re designed knowing students have an easier courseload compared to eng.

Scheduling. There is a recommended sequence, and unless you want to be like me, switch to sequence 1, have some days without lunch, have ECE140 + ECE224 in the same schedule, and still stress over weather or not you’ll be let in the courses (most likely yes), choose the recommended path in sequence 4. I find course planning fun but if you don’t want to spend multiple nights doing this, it's a good reason to stay in seq 4 as well.

Here is my Schedule, for reference. You might notice I have ECE140 in replacement for MTE120, which I was granted special permission for due to scheduling conflicts. Anything from 3A onwards TBD, but this offers what my path MIGHT look like.

![Course schedule](/ScheduleDHBlog.png)

Finally, the grey area in between HW and SW is where many CE grads go, and is also where CS + DH lives. I’ve spent a lot of time trying to figure out what this specialization actually means, and there are a lot of things that will change in the future. Feel free to ask me any questions under this post, and I wish you all the best.
