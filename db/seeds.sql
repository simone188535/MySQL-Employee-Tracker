Insert INTO department (name)
VALUES 
("Managment"),
("Marketing"),
("Technology"),
("HR"),
("Visual Design")

Insert INTO role (title, salary, department_id)
VALUES 
-- Managers
("Marketing And Sales Manager", 70,000, 1),
("Technology Manager", 100,000, 1),
("HR Manager", 70,500, 1),
("Visual Design Manager", 60,500, 1),

-- Marketing
("Junior Marketing Associate", 40,000, 1),
("Marketing Associate", 50,000, 1),
("Senior Marketing Associate", 60,000, 1),

-- Technology
("Junior Software Engineer", 60,500, 2),
("Software Engineer", 70,500, 2),
("Senior Software Engineer", 90,800, 2),

-- HR
("Junior HR Associate", 35,000, 3),
("Software HR Associate", 55,500, 3),
("Senior HR Associate", 70,000, 3),

-- Artist
("Junior Visual Design Artist", 35,000, 4),
("Visual Design Artist", 55,000, 4),
("Senior Visual Design Artist", 60,000, 4),

-- No Role
("New Hire", 0, NULL),

Insert INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
-- Managers
-- Marketing And Sales Manager
("Dave", "Berry", 1, NULL),
--Technology Manager
("Samantha", "Davis", 2, NULL),
-- HR Manager
("Rachel", "Ail", 3, NULL),
-- Visual Design Manager
("Gaston", "Bell", 4, NULL),

-- Marketing
-- Junior Marketing Associate
("Will", "Tunner", 5, 1),
-- Marketing Associate
("Ray", "Malvin", 6, 1),
-- Senior Marketing Associate
("Gerry", "Main", 7, 1),

-- Technology
-- Junior Software Engineer
("Jessica", "Bill", 8, 2),
-- Software Engineer
("Monty", "Redding", 9, 2),
-- Senior Software Engineer
("William", "Costigan", 10, 2),

-- HR
-- Junior HR Associate
("Janet", "Grain", 11, 3),
-- Software HR Associate
("Surly", "May", 12, 3),
-- Senior HR Associate
("Doctor", "Mayhem", 13, 3),

-- Artist
-- Junior Visual Design Artist
("George", "Sandin", 14, 4),
-- Visual Design Artist
("Mill", "Willis", 15, 4),
-- Senior Visual Design Artist
("Aeyllin", "Mitchill", 16, 4),

-- No Role
("Amy", "Lockhart", 17, NULL),

