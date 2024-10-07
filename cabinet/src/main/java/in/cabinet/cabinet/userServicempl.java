package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class userServicempl implements userService {

    @Autowired
    private userDAO userDAO;

    @Transactional
    @Override
    public List<User> get() {
        return userDAO.get();


    }

    @Transactional
    @Override
    public User get(int id) {
        return userDAO.get(id);
    }

    @Transactional
    @Override
    public void save(User user) {
        userDAO.save(user);
    }

    @Override
    public void delete(int id) {
        userDAO.delete(id);
    }


}
