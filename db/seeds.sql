INSERT INTO department (name)
VALUES 
('Management'),
('Marketing'),
('Technology'),
('HR'),
('Visual Design');

INSERT INTO role (title, salary, department_id)
VALUES 
-- Managers
('Marketing And Sales Manager', 70000, 1),
('Technology Manager', 100000, 1),
('HR Manager', 70500, 1),
('Visual Design Manager', 60500, 1),

-- Marketing
('Junior Marketing Associate', 40000, 2),
('Marketing Associate', 50000, 2),
('Senior Marketing Associate', 60000, 2),

-- Technology
('Junior Software Engineer', 60500, 3),
('Software Engineer', 70500, 3),
('Senior Software Engineer', 90800, 3),

-- HR
('Junior HR Associate', 35000, 4),
('Software HR Associate', 55500, 4),
('Senior HR Associate', 70000, 4),

-- Artist
('Junior Visual Design Artist', 35000, 5),
('Visual Design Artist', 55000, 5),
('Senior Visual Design Artist', 60000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
-- Managers
-- Marketing And Sales Manager
('Dave', 'Berry', 1, NULL),
-- Technology Manager
('Samantha', 'Davis', 2, NULL),
-- HR Manager
('Rachel', 'Ail', 3, NULL),
-- Visual Design Manager
('Gaston', 'Bell', 4, NULL),

-- Marketing
-- Junior Marketing Associate
('Will', 'Tunner', 5, 1),
-- Marketing Associate
('Ray', 'Malvin', 6, 1),
-- Senior Marketing Associate
('Gerry', 'Main', 7, 1),

-- Technology
-- Junior Software Engineer
('Jessica', 'Bill', 8, 2),
-- Software Engineer
('Monty', 'Redding', 9, 2),
-- Senior Software Engineer
('William', 'Costigan', 10, 2),

-- HR
-- Junior HR Associate
('Janet', 'Grain', 11, 3),
-- Software HR Associate
('Surly', 'May', 12, 3),
-- Senior HR Associate
('Doctor', 'Mayhem', 13, 3),

-- Artist
-- Junior Visual Design Artist
('George', 'Sandin', 14, 4),
-- Visual Design Artist
('Mill', 'Willis', 15, 4),
-- Senior Visual Design Artist
('Aeyllin', 'Mitchill', 16, 4);


