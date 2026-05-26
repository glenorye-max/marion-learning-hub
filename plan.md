# Updated Implementation Plan: Marion Preparatory Schools LMS Enhancements

Enhancing the LMS with homework posting, automated student grade progression, role-based student lists, and official branding.

## Phase 1: Data Model & Mock Updates
- **src/types/index.ts**:
    - Add `Homework` interface: `{ id, content, imageUrl?, grade, teacherId, timestamp }`.
    - Update `User` interface to include `enrollmentDate` (string/ISO) and `gradeLevel` (number/string).
- **src/lib/mockData.ts**:
    - Add `INITIAL_STUDENTS` array with varying grades.
    - Add `INITIAL_HOMEWORK` array.

## Phase 2: State Management (Store)
- **src/lib/store.ts**:
    - Add `students` state initialized from `INITIAL_STUDENTS`.
    - Add `homework` state initialized from `INITIAL_HOMEWORK`.
    - Implement `postHomework(content, imageFile?, grade)` logic.
    - Implement `registerStudent(data)` logic that sets enrollment date.
    - Implement `upgradeGrades()` logic that increments students' grades annually (simulated).
    - Expose filtered lists: `teacherStudents` (filtered by grade) and `allStudents` (for admin).

## Phase 3: UI Implementation
- **src/components/Navigation.tsx**:
    - Replace generic icon with the official school logo: `https://storage.googleapis.com/dala-prod-public-storage/attachments/2efa123b-bfe3-4c0a-9a83-e47ed9444b67/1779796464956_612048823_1488129283315922_2689444480805906962_n.jpg`
- **src/pages/Dashboards.tsx**:
    - **StaffView**: 
        - Add "Post Homework" Card with Textarea and File Upload.
        - Add "My Students" list (filtered by taught grades).
    - **AdminView**:
        - Add "Student Directory" section showing all students grouped by grade.
    - **StudentView**:
        - Add "Homework & Assignments" section showing relevant homework.
- **src/pages/Login.tsx**:
    - Update `handleStudentLogin` to handle simulated registration with grade assignment.

## Phase 4: Branding & Polishing
- Ensure the logo is used in the `Navigation` and `Home` pages.
- Style the new homework and student list components to match the existing theme.
