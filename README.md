Software Requirement SpecificationDocument for Basma Hotel Aswan.

Moshir Ashraf ,Khaled Yehia ,Adam Loay, Mounir Nader and Dalia Raafat Supervised by: Sherin ElBohy

October 26, 2023

Table 1: Document version history



|Version|Date|Reason for Change|
| - | - | - |
|1\.0|25-Oct-2022|SRS First version’s specificationsare defined.|
|1\.1|2-Dec-2022|.... ..... ........|
|1\.3|10-Dec-2022|...... ......|

GitHub: https://github.com/SWE-Project-23/Project

Contents

1 Introduction 3

1. Purpose of this document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1. Scope of this document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1. Business Context . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4

2 Similar Systems 4

1. Academic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
1. Business Applications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5

3 System Description 5

1. Problem Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
1. System Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
1. System Scope . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
1. System Context . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
1. Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
1. User Characteristics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

4 Functional Requirements 9

1. System Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
1. General requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
1. Guest Module . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
1. Admin Module . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
2. Detailed Functional Specification . . . . . . . . . . . . . . . . . . . . . . . . . . . 10

5 Design Constraints 12

1. Standards Compliance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
1. Hardware Limitations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
1. Other Constraints as appropriate . . . . . . . . . . . . . . . . . . . . . . . . . . . 13

6 Non-functional Requirements 13 7 Data Design 14

7\.1 Database . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16

8 Preliminary Object-Oriented Domain Analysis 17 9 Operational Scenarios 17 10 Project Plan 18

11 Appendices 19

1. Definitions,Acronyms, Abbreviations . . . . . . . . . . . . . . . . . . . . . . . . 19
1. Supportive Documents . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19

Abstract

Basma Hotel E-Booking Software is a comprehensive software solution for managing the pre-existing 4-star rated Aswanian hotel and its operations effectively. The system aims to up- grade the conventional hotel management processes through enhancing customer experience and optimizing resource utilization. Key features include a booking engine that handles room reservations and their corresponding gateway billing with alliance to the hotels availability calendar, alongside managing guests’ stays at the hotel. The software tries to also provide en- tertainmentresourcesandinformativedataaboutthehotel’sfacilitiesanditssafetyregulations. The SRS document serves as a blueprint for software development, ensuring that all partici- pants have a clear understanding of the system’s functionalities and performance expectations.

IndexTerms—- E-Booking,HotelManagementSystem,OnlineReservationSystem,Book- ing Engine

1 Introduction

Egypt is at the forefront of Arab countries in adopting new business practices and embracing glob- alization. It’s the gate-way to the Middle East. In other words, Egypt is becoming more integrated into the global economy and is making it easier for businesses to operate across borders. It is also blessed with stunning natural beauty; from the lush Nile Valley to the rugged Sahara Desert, visitors can enjoy all sorts of activities. When considering a river view with a relaxed atmosphere and a number of ancient Egyptian ruins and temples, Aswan would be a beautiful pick of a unique city with something to offer everyone. Whether it’s an interest in history, culture, nature, or simply relaxing in a beautiful setting, Aswan is the perfect destination. It’s common however for travellers to often worry about their stay, for finding an appropriate hotel could sometimes be a misleading and confusing process. Based on Google’s recommendations, Basma Hotel is a popular choice for both tourists and business travelers alike. It’s just a short walk from the Nile River and many of the city’s main attractions, such as the Aswan Museum and the Nubian Museum. The hotel offers a variety of amenities, including a rooftop terrace with stunning views of the Nile River, a restaurant and bar, a swimming pool, and a spa.

1. Purpose of this document

This SRS document describes the requirements for developing a new hotel booking web applica- tion for Basma Hotel in Aswan. The document will be used by the development team to ensure that the web application meets the needs of both guests and hotel owners. It will also be used by the testing team to develop test cases and verify that the software meets the specifiedrequirements.

2. Scope of this document

The scope of this SRS document is to definethe requirements for the development of a new online booking system, whether functional or non-functional, as well as addressing the system descrip- tion, data-design and project plan.

3. Business Context

There is a multiple of factors that affect or influence the software’s operations and its ability to succeed. These factors include :

- Industry
- Competitors
- Customers
- Economic Environment

Operating in the constantly evolving hospitality industry, the system must adapt to the changes and comply to all the applicable privacy laws and regulations. The application must provide a user-friendly experience and prices in order to compete with OTAs [1].

2 Similar Systems

1. Academic
1. Online Academic Appointment Scheduling System

This project by Teh Bin Shun in Faculty of Engineering and Science, Universiti Tunku Ab- dul Rahman, addresses the challenges faced by academic staff, including professors, lectur- ers, and researchers, in managing their appointment schedules using manual techniques. It proposes an automated online appointment scheduling system that reduces human involve- ment, streamlines the appointment process, and provides features like availability tracking and Google Calendar integration to enhance the efficiency of appointment scheduling in the academic environment [2].

2. LiLa Booking System: Architecture and Conceptual Model of a Rig Booking System for On-Line Laboratories

This project by Veronica Mateos, Luis Bellido and Victor Villagra in the Technical Univer- sity of Madrid and University of Stuttgart in Germany offers virtual and remote experiments through the internet. This system aims to efficiently manage access to remote experiments andtheirrigs, allowingstudentstoscheduleandorganizetheiractivities. Theprojectfocuses on adaptability, open-source solutions, and user role distinctions to meet the specific needs and goals of the LiLa project [3].

3. Student-Teacher Online Booking Appointment System in Academic Institutions

This study by BELLO Ridwan Oluwaseun and others presents a web-based appointment booking system designed to assist both students and lecturers in coordinating their appoint- ments. Thesystemenablesaccessthroughwebormobiledevices, allowinguserstoschedule appointmentsconvenientlyfromanywhere. ItwasdevelopedusingHTML5,PHP,Bootstrap, and MySQL to provide robust, cost-effective, and versatile functionality. The system is not only fully automated but also user-friendly, time-effective, and efficient[4].

2. Business Applications
1. Online Hotel Reservation System

The "Online Hotel Reservation System" by Richard Bemile, Akwasi Achampong, and Em- manuel Danquah streamlines customer interactions with Hansonic Hotel. Its main objectives are:

Easy Access: Provide guests with accessible information about Hansonic Hotel. EfficientBooking: Replace manual bookings with an efficientonline reservation system. Real-Time Reporting: Enable timely decision-making with real-time reports.

Data Security: Enhance data security by retaining customer information.

Convenient Reservations: Allow customers to make reservations at their own pace.

The study focuses on system monitoring, inquiries, inquiry management, and includes a virtual tour feature. This system aims to improve guest experiences and hotel operations by transitioning to an efficientweb-based platform [5].

2. Online computerized Hotel Management System

At Hansonic Hotel, the "Online Hotel Reservation System" by Ogirima, Sanni Abubakar Omuya, Awode, Tolulope Reuben, Adeosun and Olajide Olusegun streamlines customer interactions and enhances operational efficiency. Key objectives include:

- Easy Access: Providing guests with readily accessible information. - Efficient Booking: Replacing manual processes with online reservations. - Real-Time Reporting: Empowering timely decision-making. - Data Security: Enhancing customer data protection. - Convenient Reservations: Allowing easy booking for guests.

The study covers system monitoring, inquiries, and includes a virtual tour feature, ultimately improving the guest experience and hotel operations through a web-based platform [6].

3 System Description

1. Problem Statement

Booking a hotel room has become more and more of a struggle recently due to the overwhelming number of eager tourists yearning for that perfect week-end getaway exponentially increasing as the days go by especially in major worldwide tourist destinations . This causes a lot of stress and hassle utterly ruining what should have been a peaceful and tranquil vacation. To overcome that problem, hotels have turned to developing robust, easy to use and reliable online booking and management web applications. This project strives to streamline and facilitate the online booking experience of Basma hotel, a premier luxury hotel based in Aswan, Egypt.

2. System Overview

![](https://github.com/SWE-Project-23/Project/blob/main/Public/IMAGES/README/SystemOverview.png)

Figure 1: System Overview

The application will receive a booking request from the user which will be entered into the booking system which then checks if the desired room is available during the specifiedreservation period. If it was unavailable the system will inform the users and ask them to reschedule their booking or choose another room. Else, the room reservation will be created and then saved into the system’s database.

3. System Scope

The booking system will enable guests to view rooms and book them while hotel employees will be able to modify rooms and reservations. The system includes the following features:

In Scope:

1. Rooms viewing: allows users to see all available rooms in the hotel.
1. Room booking: allows users to create room reservations.
1. Reservation cancelling: allows users to cancel bookings.

Out Of Scope:

1. Guest booking modification: only hotel employees can edit reservations, guests can only create or cancel room reservations
1. Financial transactions: all booking and service payments are handled at other gateways.
4. System Context

![](https://github.com/SWE-Project-23/Project/blob/main/Public/IMAGES/README/SystemContext.png)

Figure 2: System Context

5. Objectives
- Easy and rapid room reservations.
- Display hotel rooms and demonstrate their diverse set of features.
- Fetch current, up to date room and service pricings.
- Advertise the various facilities available at the hotel.
- Show off nearby points of interest.
6. User Characteristics

1\. Foreign Guests:

- Characteristics: Above 21 ,has a valid passport, lives outside of the country’s official national borders.
  1. Roles: Booking and viewing rooms, requesting hotel services.
2. Local Guests:
   1. Characteristics: Above 21 ,has a valid national ID, lives outside of the country’s official national borders.
   1. Roles: Booking and viewing rooms, requesting hotel services.
2. Hotel Managers:
   1. Characteristics: Above 21, plays a managerial role in the hotel.
   1. Roles: Creates, modifies and deletes rooms, gives users employee privileges, handles reservation modificationrequests.

4\. Hotel Employee:

- Characteristics: Above 21, works at the hotel customer service / reservations desk.
- Roles: handles reservation modificationrequests, manages customer complaints.

4 Functional Requirements

The below use case diagram demonstrates the system’s functional requirements. The system sup- ports 2 types of users a guests and admins

1. System Functions

![](https://github.com/SWE-Project-23/Project/blob/main/Public/IMAGES/README/thediagramforproject.png)

Figure 3: Use Case Diagram

1. General requirements
1. The system shall allow the user to enter their personal data and sign up (GR01)
1. The system shall allow the user to log into their account (GR02)
1. The system shall allow the user to view their account details (GR03)
1. The system shall allow the user to edit their account details (GR04)
2. Guest Module
1. The guest shall be able to view all the available rooms (GM01)
1. The guest shall be able to view all the details of any room and their availability (GM02)
1. The guest shall be able to add payment methods to be used during the booking (GM03)
1. The guest shall be able to book a room (GM04)
1. The user shall be able to see previous reservations (GM05)
1. The user shall be able to cancel a reservation (GM06)
3. Admin Module
1. The admin shall be able to add rooms (AM01)
1. The admin shall be able to edit/delete rooms (AM02)
1. The admin shall be able to add/edit/delete reservations (AM03)
1. The admin shall be able to see all customer data (AM04)
2. Detailed Functional Specification

Table 2: addUser Function Description

|Name|addUser|
| - | - |
|Code|GR01|
|Priority|Extreme|
|Critical|This function is crucial to allow the customer to add their data to be able to log in later on|
|Description|The user will be able to write all their data into input fields and this data will be saved into the database|
|Input|all the user data|
|Output|guest added into the database|
|Pre-condition|The user must able to visit the registration page|
|Post-condition|The user will be automatically logged in|
|Dependency|none|
|Risk|none|

Table 3: viewRooms Function Description

|Name|viewRooms|
| - | - |
|Code|GM01|
|Priority|Extreme|
|Critical|This function is required to allow the user to see all the rooms that the hotel offers|
|Description|This function will retrieve all the rooms from the database so that they can be displayed for the user|
|Input|none|
|Output|all of the rooms that the website offers are displayed|
|Pre-condition|none|
|Post-condition|All the rooms the hotel offers will be displayed to the user|
|Dependency|none|
|Risk|none|

Table 4: viewRoom Function Description

|Name|viewRoom|
| - | - |
|Code|GM02|
|Priority|Extreme|
|Critical|This function is important so that the customer will be able to see the room details and the availability of the room|
|Description|Viewing all the details of a specific room including avail- ability|
|Input|roomType|
|Output|a page with all the room details and availability|
|Pre-condition|none|
|Post-condition|A page with the required room is generated|
|Dependency|none|
|Risk|none|

Table 5: bookRoom Function Description

|Name|bookRoom|
| - | - |
|Code|GM04|
|Priority|Extreme|
|Critical|This function is crucial to allow the customer to book the room they want|
|Description|After the user is presented with all the rooms and their availability date, the user shall book the chosen room|
|Input|roomType, guestEmail|
|Output|reservation|
|Pre-condition|- The guest must be logged in -Theguestmusthaveselectedtheroomthatwillbebooked|
|Post-condition|Thebookingconfirmationwillbeprintedonthescreen,and the booking will be saved in the database|
|Dependency|Depends on GR02|
|Risk|none|

Table 6: addRoom Function Description

|Name|addRoom|
| - | - |
|Code|AM01|
|Priority|Extreme|
|Critical|This function is crucial to allow the admin to add a room with all its details for the user to be able to book it|
|Description|The admin shall be able to enter all the room details and submit it to be saved into the database|
|Input|all the room’s data|
|Output|the room is added to the database|
|Pre-condition|- The admin must be logged in|
|Post-condition|The new room will be saved into the database with all it’s details|
|Dependency|Depends on GR02|
|Risk|none|

5 Design Constraints

1. Standards Compliance
- Privacy and Security:
  - The booking system strictly adheres to privacy and security standards to protect user’s data, ensuring that personal information remains confidentialand safeguarded.
- COVID-19 Safety:
- The hotel aligns with health guidelines to ensure safety. We comply with safety regulations to protect our guests and staff.
- Age Requirement:
  - The software requires that the guests to be at least 21 years old as per the country’s hospi- tality regulations.
- Payment Security:
- The system complies with secure payment gateways to protect transactions, ensuring the safety of users’ financialdata.
2. Hardware Limitations
- Device Compatibility:
  - Desktops: Optimized for Windows and macOS, ensuring efficient performance and user- friendly interface.
  - Laptops: Adapts to various screen sizes and resolutions, providing seamless access.
  - Tablets: Responsive design for intuitive touch-based interactions. -MobileDevices(iOSandAndroid): Dedicatedmobileappsforon-the-gotravelers, tailored to smaller screens.
- Network Needs:
- High-Speed Internet: Swift loading and real-time updates for users with high-speed con- nections.
- Mobile Data: Optimized for efficiency to minimize data consumption for travelers using mobile data.
3. Other Constraints as appropriate
- Age Requirement: -Usersmustbeatleast18yearsoldtomakereservationsthroughthesystem. Thisconstraint ensures compliance with legal and ethical standards for booking accommodations.
- Geographical Scope:
- Our system is is geographically crafted for users interested in visiting or exploring Aswan, catering to tourists, business travelers, and anyone planning an Aswan adventure with tai- lored booking services.

6 Non-functional Requirements

1. Security:
- The system shall be secure against SQL injection attacks.
- All user passwords shall be hashed.
- Web application shall be HTTPS secured.
2. Performance:
- The web application shall be stably running at all times.
- Rapid function execution
3. Reliability:
   1. The web application’s various services shall be available for use 24/7.
3. Usability:
- The web application front-end shall incorporate an intuitive and user-friendly design.
- All pages shall be easily accessible through clearly definedhyperlinks and buttons.

7 Data Design

The Basma hotel reservation system relies on three core tables: "Guest", "Rooms" and "Reserva- tion." Each table ensures efficientoperation and a seamless guest experience.

1. Guest Table:-
   1. Stores crucial patron information, including personal details, contact information, and bio- graphical data.
   1. To bolster security, it retains credit card information.
   1. Manages guest roles and personal bios.
   1. Allows for linking social media profilesfor enhanced communication.
1. Rooms Table:
   1. Instrumental in managing various accommodations.
   1. Maintains data on room types, quantities, pricing, and capacity.
   1. Stores room descriptions, characteristics, and images.
   1. Clearly distinguishes standard and executive rooms.
1. Reservation Table:
   1. Facilitates the booking process, associating guests with specificrooms.
   1. Records pricing, occupancy, and special requests.
   1. Pricing, occupancy, and any special requests are recorded.
   1. Forms the core of booking and availability management.
1. Questions Table:
- Stores user questions and messages, facilitating communication.
- Questions are linked to the "Guest" table based on the user’s email for comprehensive support and interaction management.

These tables are the foundation of our online hotel management system, securely storing guest and room information while enabling efficient booking and reservations. The "Data Design" section serves as the blueprint for our database structure.

7\.1 Database

![](https://github.com/SWE-Project-23/Project/blob/main/Public/IMAGES/README/ER.png)

Figure 4: database ERD diagram

8 Preliminary Object-Oriented Domain Analysis

![](https://github.com/SWE-Project-23/Project/blob/main/Public/IMAGES/README/db.png)

Figure 5: Initial class diagram for the database

9 Operational Scenarios

Scenario 1: Guest books a room

Initial assumption: The user has visited the website and is logged in.

Normal: The user views all the rooms available and clicks on a room to view its details. The user clicks/taps on "book room" from the room details page. The guest will be prompted to either enter a payment method or to choose one if the guest has used a payment method before. After the payment succeeds, confirmationwill be printed and the user will be redirected to the page

What could go wrong:

1. the user might not be logged in
1. the payment method might be declined or blocked by the bank

Scenario 2: user deletes a reservation

Initial assumption: The user has visited the website and is logged in.

Normal: The guest accesses his profile and chooses reservations to be able to see current and past reservations. From reservations page the guest could choose a specific reservation to view it in more details. After expanding a reservation a cancel button can be clicked which cancels the reservation.

What could go wrong:

1\. he accidentally deletes the wrong reservation

Scenario 3: Admin adds a room

Initial assumption: The user has visited the website and is logged in.

Normal: The user clicks/taps on add room from the admin panel, enters all the room details, and clicks add room. Then the room will be added to the database and both the admin and the guest will be able to see the room

What could go wrong:

1\. The admin could enter wrong/invalid info

10 Project Plan

![](https://github.com/SWE-Project-23/Project/blob/main/Public/IMAGES/README/SWEPROJECT.PNG)

Figure 6: Detailed plan from proposal to SDD

11 Appendices

1. Definitions,Acronyms, Abbreviations

SRS: Software Requirement Specification OTA : Online Travel Agency

2. Supportive Documents

References

1. Fu Tsang, Nelson Kee, and et al. “Measuring E-Service Quality for Online Travel Agencies”. In: Journal of Travel Tourism Marketing 27.3 (2010), pp. 306–323. DOI: https://doi. org/10.1080/10548401003744743.
1. Lee Kong and Teh Bin Shun. ONLINE ACADEMIC APPOINTMENT SCHEDULING SYS- TEM. Project Report. 2017. URL: http://eprints.utar.edu.my/2743/1/SE-2017- 1300515-1.pdf.
1. Veronica Mateos et al. LiLa Booking System: Architecture and Conceptual Model of a Rig Booking System for On-Line Laboratories. Preparation of Papers for the International Journal of Online Engineering (IJOE). 2016.
1. BELLO Ridwan Oluwaseun, OLUGBEBI Muyiwa, BABATUNDE Abdulrauph Olanrewaju, et al. Student-Teacher Online Booking Appointment System in Academic Institutions. Journal of Computer Science and Control Systems. 2016.
1. Richard Bemile, Akwasi Achampong, and Emmanuel Danquah. Online Hotel Reservation System. International Journal of Innovative Science, Engineering Technology (IJISET), Vol. 1, Issue 9, November 2014. 2014.
1. Sanni Ogirima et al. Online Computerized Hotel Management System. JOURNAL OF COM- PUTATION IN BIOSCIENCES AND ENGINEERING. 2014.
18
