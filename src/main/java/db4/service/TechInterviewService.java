package db4.service;

import db4.model.problem.Problem;
import db4.model.problem.ProblemRepository;
import db4.model.problem_feedback.ProblemFeedback;
import db4.model.problem_feedback.ProblemFeedbackId;
import db4.model.problem_feedback.ProblemFeedbackRepository;
import db4.model.role.Role;
import db4.model.tech_interview.TechInterview;
import db4.model.tech_interview.TechInterviewDto;
import db4.model.tech_interview.TechInterviewInputDto;
import db4.model.tech_interview.TechInterviewRepository;
import db4.model.user.User;
import db4.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TechInterviewService {
    @Autowired
    private TechInterviewRepository techInterviewRepository;
    @Autowired
    private ProblemFeedbackRepository problemFeedbackRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProblemRepository problemRepository;


    public List<TechInterview> getTechInterviews(Integer limit) {
        return techInterviewRepository.findAll(Sort.by(Sort.Order.desc("id")))
                .stream()
                .limit(limit)
                .toList();
    }

    public List<TechInterview> getTechInterviewsByUser(User user) {
        return techInterviewRepository.findAllByUser(user);
    }

    public List<TechInterview> getTechInterviewByInterviewer(User interviewer) {
        return techInterviewRepository.findAllByInterviewer(interviewer);
    }

    public TechInterviewDto toDto(TechInterview techInterview) {
        List<Integer> tasks = problemFeedbackRepository.findAllByTechInterview(techInterview)
                .stream()
                .map(p -> p.getProblem().getProblemId())
                .toList();
        return TechInterviewDto.builder()
                .id(techInterview.getId())
                .interviewer(techInterview.getInterviewer().getLogin())
                .date(techInterview.getDate().toLocalDateTime().toLocalDate().toString())
                .login(techInterview.getUser().getLogin())
                .result(techInterview.getStatus())
                .tasks(tasks)
                .build();
    }

    public void addFromDto(TechInterviewInputDto dto) {
        User interviewee = userRepository.getReferenceById(dto.getLogin());
        if (!interviewee.getRole().getName().equals("USER")) throw new NoSuchElementException();
        User interviewer = userRepository.getReferenceById(dto.getId());
        if (!interviewer.getRole().getName().equals("DEVELOPER")) throw new NoSuchElementException();
        techInterviewRepository.save(TechInterview.builder()
                .interviewer(interviewer)
                .date(dto.getDate())
                .user(interviewee)
                .build());
    }

    public void changeStatus(Long id, Boolean status) {
        TechInterview techInterview = techInterviewRepository.getReferenceById(id);
        techInterview.setStatus(status);
        techInterviewRepository.save(techInterview);
    }

    public void addProblem(Long id, Integer problemId) {
        TechInterview techInterview = techInterviewRepository.getReferenceById(id);
        Problem problem = problemRepository.getReferenceById(problemId);
        problemFeedbackRepository.save(ProblemFeedback.builder()
                .problem(problem)
                .techInterview(techInterview)
                .build());
    }

    public String getComment(Long id, Integer problemId) {
        TechInterview techInterview = techInterviewRepository.getReferenceById(id);
        Problem problem = problemRepository.getReferenceById(problemId);
        return problemFeedbackRepository.getReferenceById(ProblemFeedbackId.builder()
                .techInterview(techInterview)
                .problem(problem)
                .build()).getComment();
    }

    public void updateComment(Long id, Integer problemId, String comment) {
        TechInterview techInterview = techInterviewRepository.getReferenceById(id);
        Problem problem = problemRepository.getReferenceById(problemId);
        ProblemFeedback problemFeedback = problemFeedbackRepository.getReferenceById(ProblemFeedbackId.builder()
                .techInterview(techInterview)
                .problem(problem)
                .build());
        problemFeedback.setComment(comment);
        problemFeedbackRepository.save(problemFeedback);
    }
}
