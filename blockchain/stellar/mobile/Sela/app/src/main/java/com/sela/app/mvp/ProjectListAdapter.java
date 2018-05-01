package com.sela.app.mvp;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.sela.app.mvp.ProjectListFragment.ProjectListInteractionListener;
import com.sela.app.mvp.ProjectItem;

import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link ProjectItem} and makes a call to the
 * specified {@link ProjectListInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */
public class ProjectListAdapter extends RecyclerView.Adapter<ProjectListAdapter.ViewHolder> {

    private final List<ProjectItem> values;
    private final ProjectListInteractionListener listener;

    public ProjectListAdapter(List<ProjectItem> items, ProjectListInteractionListener listener) {
        this.values = items;
        this.listener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.activity_project_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.item = values.get(position);
//        holder.idView.setText(this.values.get(position).id);
        holder.contentView.setText(this.values.get(position).content);

        holder.view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != listener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    listener.onProjectListInteraction(holder.item);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return this.values.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View view;
//        public final TextView idView;
        public final TextView contentView;
        public ProjectItem item;

        public ViewHolder(View view) {
            super(view);
            this.view = view;
//            idView = (TextView) view.findViewById(R.id.item_number);
            this.contentView = (TextView) view.findViewById(R.id.project_item_content);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + this.contentView.getText() + "'";
        }
    }
}
